import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function EvaluationForm({ onEvaluationComplete }) {
  const [query, setQuery] = useState('Solve: 10 + 5 * 2');
  const [response, setResponse] = useState('The answer is 30. First, you add 10 + 5 = 15. Then you multiply 15 * 2 = 30.');
  const [runId, setRunId] = useState('v2');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload = {
      users_query: query,
      llms_response: response,
      rubric: {
        name: "Math Rubric",
        description: "For evaluating math solutions.",
        criteria: [
          {
            name: "Factual Accuracy",
            description: "Check if the math calculation is mathematically correct according to standard rules.",
            weight: 0.7
          }
        ]
      },
      run_id: runId
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setResult(data);
      
      if (onEvaluationComplete) onEvaluationComplete();
    } catch (error) {
      console.error("Evaluation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-lg w-full mt-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
          Trigger New Evaluation
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">User Input Query</label>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows="3"
                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">AI Model Response</label>
              <textarea 
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows="3"
                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-1/3">
            <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Run ID / Version Tag</label>
            <input 
              type="text"
              value={runId}
              onChange={(e) => setRunId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100 outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-1/3 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10 disabled:bg-slate-800 font-semibold text-xs uppercase tracking-wider py-3 rounded-lg transition-all flex items-center justify-center gap-2 self-start mt-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <><Play className="w-4 h-4" /> Execute Evaluation</>}
          </button>
        </div>

        {result && (
          <div className="w-full lg:w-[350px] border-l border-slate-800 lg:pl-6 flex flex-col gap-3 justify-center">
            <div className="flex items-center gap-3">
              {result.is_pass ? (
                <CheckCircle2 className="text-emerald-400 w-8 h-8 flex-shrink-0" />
              ) : (
                <XCircle className="text-rose-500 w-8 h-8 flex-shrink-0" />
              )}
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Evaluation Score</p>
                <p className={`text-2xl font-bold ${result.is_pass ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {(result.score * 100).toFixed(0)}% <span className="text-sm font-normal text-slate-500">{result.is_pass ? 'Passed' : 'Failed'}</span>
                </p>
              </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 max-h-[140px] overflow-y-auto">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Judge Reasoning:</p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{result.feedback}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}