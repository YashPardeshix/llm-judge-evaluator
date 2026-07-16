from backend.app.schemas import Rubric, EvaluationResult
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.environ.get("NVIDIA_API_KEY")

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=api_key
)



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

    CRITICAL: You must return your evaluation strictly as a JSON object matching this schema:
    {{
      "score": float (0.0 to 1.0, representing the overall weighted score),
      "is_pass": boolean (true if the overall score meets passing standards, false otherwise),
      "feedback": "string (your detailed reasoning explaining how the model scored on each criterion)"
    }}
    """
  
    completion = client.chat.completions.create(
        model="deepseek-ai/deepseek-v4-flash",
        messages=[{"role": "user", "content": system_prompt}], 
        temperature=0.1  
    )

    raw_json = completion.choices[0].message.content

    print("\n=== DEBUGGING NVIDIA RESPONSE ===")
    print(f"Raw Content: {raw_json}")
    print(f"Full Completion Object: {completion}")
    print("=================================\n")

    validated_result = EvaluationResult.model_validate_json(raw_json)
   
    return validated_result