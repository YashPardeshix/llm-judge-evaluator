import React, { useState } from 'react';
import { GitCompare, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function ComparePanel() {
  const [baselineRun, setBaselineRun] = useState('v1');
  const [currentRun, setCurrentRun] = useState('v2');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseline_run: baselineRun,
          current_run: currentRun,
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error connecting to backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-lg h-full justify-between">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Run Comparison</span>
      </div>

      <div className="flex flex-col gap-4 flex-grow justify-center">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Baseline Run (Gold Standard)</label>
          <select 
            value={baselineRun}
            onChange={(e) => setBaselineRun(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100 outline-none focus:border-blue-500"
          >
            <option value="v1">Run v1 (Good Accuracy)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Current Run (Recent Test)</label>
          <select 
            value={currentRun}
            onChange={(e) => setCurrentRun(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100 outline-none focus:border-blue-500"
          >
            <option value="v2">Run v2 (Wrong calculation)</option>
          </select>
        </div>

        <button 
          onClick={handleCompare}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            'Run Statistical T-Test'
          )}
        </button>

        {result && (
          <div className="mt-2 transition-all duration-300">
            {result.is_regression ? (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                <AlertTriangle className="text-rose-400 w-5 h-5 flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="font-semibold text-rose-400 text-sm leading-none">Regression Detected</p>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    Quality dropped significantly between the two runs (p &lt; 0.05).
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <CheckCircle2 className="text-emerald-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-400 text-sm leading-none">System Stable</p>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    No statistically significant drop in quality detected.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}