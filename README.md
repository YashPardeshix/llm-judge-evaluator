# Judge.ai: LLM-as-Judge Evaluation Service

An automated, full-stack quality control system for AI outputs. This service evaluates LLM responses against customized rubrics, stores score history, and runs statistical t-tests to automatically detect quality regressions over time.

---

## System Architecture

```text
  [ React Dashboard ] (Port 5173)
         │
         │ (HTTP REST / JSON)
         ▼
    [ FastAPI ] ──(Calls)──► [ DeepSeek-v4-flash via NVIDIA NIM ]
         │                        │
     (Writes)                     │ (Enforces Pydantic Schema)
         ▼                        ▼
  [ SQLite DB ] ◄───────── [ EvaluationResult ]
         │
  (Reads score groups for t-test)
         ▼
  [ SciPy Analytics Engine ] (Independent T-Test)

⚡ Production Patterns Utilized

1. Pattern 9 — LLM-as-Judge with Strict JSON Serialization

  - Trigger: When converting loose, unpredictable LLM text generations into
    validated, machine-readable metrics.
  - Implementation: The backend system prompts the judge LLM to return its
    response strictly as a JSON object, which is then parsed and verified by
    Pydantic's model_validate_json() to guarantee schema integrity before
    database storage.

2. Pattern 10 — Nested Schema Composition

  - Trigger: When representing complex, hierarchical relationships in API
    payloads.
  - Implementation: Nesting multiple Criterion objects inside a Rubric container
    class. This keeps evaluation rules grouped by domain and prevents
    cross-domain data pollution.

3. Pattern 11 — Quality Regression Detection

  - Trigger: When mathematically proving if a drop in quality is a real
    regression or just random chance.
  - Implementation: Using scipy.stats.ttest_ind to run an independent two-sample
    t-test comparing a baseline run's score distribution against a new test
    run's scores. A regression alert is triggered if p-value < 0.05.

🚀 Tech Stack

  - Backend: Python, FastAPI, Pydantic, SQLite, SciPy, OpenAI Python SDK
  - Frontend: React, Vite, Tailwind CSS (v4), Recharts, Lucide Icons
  - LLM Judge: DeepSeek-v4-flash (via NVIDIA NIM)

🛠️ Quick Start

1. Backend Setup

Navigate to the root directory, create a .env file, and add your NVIDIA API Key:

NVIDIA_API_KEY=your_key_here

Install dependencies and run the server:

pip install fastapi uvicorn scipy python-dotenv openai
uvicorn backend.app.main:app --reload

Interactive Swagger Docs are live at: http://127.0.0.1:8000/docs

2. Frontend Setup

Open a new terminal tab, navigate to the frontend directory, install packages,
and start the development server:

cd frontend
npm install
npm run dev

Dashboard is live at: http://localhost:5173

📡 API Endpoints

POST /evaluate

Evaluates a raw LLM output against a structured rubric..

  - Payload: EvaluationRequest (includes users_query, llms_response, rubric,
    run_id).
  - Returns: EvaluationResult (includes score, is_pass, feedback).

POST /compare

Executes an independent t-test between two run IDs.

  - Payload: CompareRequest (includes baseline_run, current_run).
  - Returns: baseline_count, current_count, is_regression.


