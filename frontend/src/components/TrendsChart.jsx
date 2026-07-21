import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function TrendsChart({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-lg w-full h-[380px]">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
          <TrendingUp className="text-blue-400 w-5 h-5" />
          Historical Score Trends
        </h3>
        <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-1 rounded-full uppercase tracking-wider">
          Last 30 Days
        </span>
      </div>

      <div className="flex-1 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* Dark theme grid lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
            
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />

            <Tooltip
              contentStyle={{ background: '#020617', borderColor: '#334155', borderRadius: '8px' }}
              labelStyle={{ color: '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}
              itemStyle={{ color: '#38bdf8', fontSize: '13px' }}
            />
            
            <Line
              type="monotone"
              dataKey="score"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ fill: '#0f172a', stroke: '#38bdf8', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#38bdf8', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}