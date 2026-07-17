from fastapi import FastAPI
from backend.app.schemas import EvaluationRequest, EvaluationResult
from backend.app.judge import evaluate
from backend.app.database import save_evaluation

app = FastAPI(title="LLM-as-Judge API")

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
        result=result
    )
    
    return result