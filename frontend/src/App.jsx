import React, { useState } from 'react';
import { ShieldAlert, BarChart2 } from 'lucide-react';
import StatsRow from './components/StatsRow';
import TrendsChart from './components/TrendsChart';
import ComparePanel from './components/ComparePanel';
import EvaluationForm from './components/EvaluationForm';

export default function App() {
  const [stats, setStats] = useState({
    totalEvaluations: 124,
    averageScore: 0.82,
    activeAlerts: 1,
  });

  const [trendData, setTrendData] = useState([
    { name: 'v1.0', score: 90 },
    { name: 'v1.1', score: 85 },
    { name: 'v1.2', score: 88 },
    { name: 'v2.0', score: 30 },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-64 bg-slate-950 border-r border-slate-900 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-rose-500 w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">Judge.ai</span>
        </div>
        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-rose-500/10 text-rose-400 rounded-lg font-medium text-sm text-left w-full">
            <BarChart2 className="w-5 h-5" />
            Overview
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 flex flex-col gap-8 bg-slate-950">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">System Quality Overview</h1>
          <p className="text-slate-400 text-sm">Real-time LLM output auditing and statistical regression monitoring.</p>
        </header>

        <StatsRow 
          total={stats.totalEvaluations} 
          average={stats.averageScore} 
          alerts={stats.activeAlerts} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <TrendsChart data={trendData} />
          </div>
          
          <div className="lg:col-span-4">
            <ComparePanel />
          </div>
        </div>
        <EvaluationForm />
      </main>
    </div>
  );
}