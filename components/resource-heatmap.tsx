"use client"

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Jan", resources: 4000, efficiency: 2400 },
  { name: "Feb", resources: 3000, efficiency: 1398 },
  { name: "Mar", resources: 2000, efficiency: 9800 },
  { name: "Apr", resources: 2780, efficiency: 3908 },
  { name: "May", resources: 1890, efficiency: 4800 },
  { name: "Jun", resources: 2390, efficiency: 3800 },
  { name: "Jul", resources: 3490, efficiency: 4300 },
]

export function ResourceHeatmap() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="resourceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(255,255,255,0.3)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="rgba(255,255,255,0)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(160,160,160,0.3)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="rgba(160,160,160,0)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
          />
          <YAxis 
            hide 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}
            labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
            itemStyle={{ color: 'rgba(255,255,255,0.6)' }}
          />
          <Area
            type="monotone"
            dataKey="resources"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={2}
            fill="url(#resourceGradient)"
          />
          <Area
            type="monotone"
            dataKey="efficiency"
            stroke="rgba(160,160,160,0.5)"
            strokeWidth={2}
            fill="url(#efficiencyGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/50" />
          <span className="text-xs text-white/40">Resources</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <span className="text-xs text-white/40">Efficiency</span>
        </div>
      </div>
    </div>
  )
}
