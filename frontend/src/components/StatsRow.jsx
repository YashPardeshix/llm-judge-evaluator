import React from 'react';
import { Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function StatsRow({ total, average, alerts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(59,130,246,0.05)]">
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Total Evaluations</p>
          <p className="text-3xl font-bold text-slate-100">{total}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
          <Layers className="text-blue-400 w-6 h-6" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.05)]">
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Average Quality</p>
          <p className="text-3xl font-bold text-slate-100">
            {(average * 100).toFixed(0)}<span className="text-lg text-slate-500 ml-1">%</span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="text-emerald-400 w-6 h-6" />
        </div>
      </div>

      <div className={`bg-slate-900 border p-6 rounded-xl flex items-center justify-between transition-all ${
        alerts > 0 
          ? 'border-rose-500/40 bg-rose-950/10 shadow-[0_0_15px_rgba(244,63,94,0.15)] animate-pulse' 
          : 'border-slate-800 shadow-none'
      }`}>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
            alerts > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'
          }`}>
            Regression Alerts
          </p>
          <p className="text-3xl font-bold text-slate-100">{alerts}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
          alerts > 0 ? 'bg-rose-500/10 border-rose-500/30' : 'bg-slate-800/10 border-slate-800'
        }`}>
          <AlertTriangle className={alerts > 0 ? 'text-rose-400 w-6 h-6' : 'text-slate-500 w-6 h-6'} />
        </div>
      </div>
    </div>
  );
}