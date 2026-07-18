from fastapi import FastAPI
from backend.app.schemas import EvaluationRequest, EvaluationResult, CompareRequest
from backend.app.judge import evaluate
from backend.app.database import save_evaluation, get_scores_by_run_id, init_db 
from backend.app.analytics import detect_regression 

app = FastAPI(title="LLM-as-Judge API")

init_db()

@app.post("/evaluate", response_model=EvaluationResult)
def run_evaluation(request: EvaluationRequest):
    
    result = evaluate(
        users_query=request.users_query,
        llms_response=request.llms_response,
        rubric=request.rubric
    )
    
    save_evaluation(
        user_query=request.users_query,
        llms_response=request.llms_response,
        result=result,
        run_id=request.run_id
    )

    return result


@app.post("/compare")
def compare_runs(request: CompareRequest):
    baseline_scores = get_scores_by_run_id(request.baseline_run)
    current_scores = get_scores_by_run_id(request.current_run)
    regression = detect_regression(baseline_scores, current_scores)
    return {
        "baseline_count": len(baseline_scores),
        "current_count": len(current_scores),
        "is_regression": regression
    }
