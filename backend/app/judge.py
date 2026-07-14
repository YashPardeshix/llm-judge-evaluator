from app.schemas import Rubric, EvaluationResult

def evaluate(users_query: str, llms_response: str, rubric: Rubric) -> EvaluationResult:
    formatted_rules = ""
    for rule in rubric.criteria:
        formatted_rules += f"- Rule: {rule.name} (Weight: {rule.weight})\n"
        formatted_rules += f"  Description: {rule.description}\n\n"
        
    system_prompt = f"""
    You are an expert, unbiased AI Judge evaluating a language model's response.

    Here is the context of the interaction:
    - User's Original Query: {users_query}
    - Model's Response under evaluation: {llms_response}

    Your task is to grade this response using the following Rubric:
    {formatted_rules}

    Please evaluate the response against every criterion in the rubric.
    Calculate the overall weighted score and decide if it is a pass or fail.
    """
    