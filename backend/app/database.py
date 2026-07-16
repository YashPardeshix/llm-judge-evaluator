from backend.app.schemas import EvaluationResult
import sqlite3

DB_PATH = "evaluations.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS evaluations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_query TEXT,
        llm_response TEXT,
        score REAL,
        is_pass INTEGER,
        feedback TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()


def save_evaluation(user_query: str, llms_response: str, result: EvaluationResult):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    score = result.score
    is_pass_int = 1 if result.is_pass else 0  
    feedback = result.feedback
    
    cursor.execute("""
    INSERT INTO evaluations (user_query, llm_response, score, is_pass, feedback)
    VALUES (?, ?, ?, ?, ?);
    """, (user_query, llms_response, score, is_pass_int, feedback))
    
    conn.commit()
    conn.close()