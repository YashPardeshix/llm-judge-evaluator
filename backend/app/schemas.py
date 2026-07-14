from typing import List
from pydantic import BaseModel

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