from backend.app.schemas import Criterion, Rubric
from backend.app.judge import evaluate
from backend.app.database import init_db, save_evaluation

init_db()

rule_one = Criterion(
    name="Factual Accuracy",
    description="Check if the math calculation is mathematically correct according to standard rules.",
    weight=0.7
)

rule_two = Criterion(
    name="Clarity",
    description="Check if the steps of the calculation are clearly explained.",
    weight=0.3
)

math_rubric = Rubric(
    name="Math Rubric",
    description="For evaluating math solutions.",
    criteria=[rule_one, rule_two]
)

query = "Solve: 10 + 5 * 2"
bad_response = "The answer is 30. First, you add 10 + 5 = 15. Then you multiply 15 * 2 = 30."

print("Running LLM Judge Evaluation...")

result = evaluate(
    users_query=query,
    llms_response=bad_response,
    rubric=math_rubric
)

print("\nSaving result to SQLite database...")

save_evaluation(
    user_query=query,
    llms_response=bad_response,
    result=result
)

print("Result successfully saved!")

# 8. Print the structured result
print("\n--- EVALUATION RESULT ---")
print(f"Score: {result.score}")
print(f"Passed: {result.is_pass}")
print(f"Reasoning:\n{result.feedback}")