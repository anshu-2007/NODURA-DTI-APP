"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface GlassIconProps {
  icon: LucideIcon
  size?: number
  className?: string
}

export function GlassIcon({ icon: Icon, size = 24, className }: GlassIconProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center rounded-lg p-2",
        "bg-white/5 border border-white/10",
        className
      )}
    >
      <Icon 
        size={size} 
        className="text-white/60"
        strokeWidth={1.5}
      />
    </div>
  )
}
