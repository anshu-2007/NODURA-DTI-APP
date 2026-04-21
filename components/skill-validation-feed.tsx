"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BadgeCheck, Shield, Zap, Code, Palette } from "lucide-react"

const skills = [
  { id: 1, name: "Sarah Chen", skill: "Event Management", icon: Shield, level: "Expert", time: "2m ago" },
  { id: 2, name: "Marcus Johnson", skill: "Technical Setup", icon: Code, level: "Advanced", time: "5m ago" },
  { id: 3, name: "Emily Rodriguez", skill: "Visual Design", icon: Palette, level: "Expert", time: "8m ago" },
  { id: 4, name: "James Wilson", skill: "Leadership", icon: Zap, level: "Master", time: "12m ago" },
  { id: 5, name: "Aisha Patel", skill: "Coordination", icon: Shield, level: "Advanced", time: "15m ago" },
]

export function SkillValidationFeed() {
  const [currentSkills, setCurrentSkills] = useState(skills.slice(0, 3))
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkills(prev => {
        const newSkills = [...prev]
        const randomSkill = skills[Math.floor(Math.random() * skills.length)]
        newSkills.unshift({ ...randomSkill, id: Date.now(), time: "Just now" })
        return newSkills.slice(0, 3)
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {currentSkills.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                <span className="text-sm font-medium text-white">{item.name.charAt(0)}</span>
              </div>
              {/* Verification badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center border-2 border-card">
                <BadgeCheck className="w-3 h-3 text-white" />
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white truncate">{item.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">{item.level}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/40">
                <item.icon className="w-3 h-3" />
                <span>{item.skill}</span>
              </div>
            </div>
            
            {/* Time */}
            <span className="text-xs text-white/30">{item.time}</span>
            
            {/* Glowing badge */}
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-emerald-500/20 blur-md animate-pulse" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
