from typing import List
from pydantic import BaseModel

from backend.app.test_analytics import baseline_a

class Criterion(BaseModel):
    name: str
    description: str
    weight: float

class Rubric(BaseModel):
    name: str
    description: str
    criteria: List[Criterion]

class EvaluationResult(BaseModel):
    score: float
    is_pass: bool
    feedback: str  
    

class EvaluationRequest(BaseModel):
    users_query: str
    llms_response: str
    rubric: Rubric
    run_id: str


class CompareRequest(BaseModel):
    baseline_run: str
    current_run: str
