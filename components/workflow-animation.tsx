"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

const stages = ["Pending", "In Review", "Verified"]

export function WorkflowAnimation() {
  const [currentStage, setCurrentStage] = useState(0)
  const [tasks, setTasks] = useState([
    { id: 1, name: "Venue Booking", stage: 2 },
    { id: 2, name: "Catering Setup", stage: 1 },
    { id: 3, name: "AV Equipment", stage: 0 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => prev.map(task => ({
        ...task,
        stage: (task.stage + 1) % 3
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      {/* Stage Indicators */}
      <div className="flex items-center justify-between gap-2">
        {stages.map((stage, idx) => (
          <div key={stage} className="flex-1 flex items-center">
            <div className={`
              flex items-center gap-1 px-2 py-1 rounded-full text-xs flex-1
              ${idx === 0 ? 'bg-amber-500/20 text-amber-400' : ''}
              ${idx === 1 ? 'bg-blue-500/20 text-blue-400' : ''}
              ${idx === 2 ? 'bg-emerald-500/20 text-emerald-400' : ''}
            `}>
              {idx === 0 && <Clock className="w-3 h-3" />}
              {idx === 1 && <Loader2 className="w-3 h-3 animate-spin" />}
              {idx === 2 && <CheckCircle2 className="w-3 h-3" />}
              <span className="hidden sm:inline">{stage}</span>
            </div>
            {idx < stages.length - 1 && (
              <ArrowRight className="w-3 h-3 text-white/20 mx-1 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      
      {/* Tasks */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="relative">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs text-white/60 flex-1">{task.name}</span>
              <motion.div
                key={`${task.id}-${task.stage}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`
                  px-2 py-0.5 rounded-full text-xs font-medium
                  ${task.stage === 0 ? 'bg-amber-500/20 text-amber-400' : ''}
                  ${task.stage === 1 ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${task.stage === 2 ? 'bg-emerald-500/20 text-emerald-400' : ''}
                `}
              >
                {stages[task.stage]}
              </motion.div>
            </div>
            
            {/* Progress bar */}
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((task.stage + 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
