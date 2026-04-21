"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FooterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="relative py-24 px-4">
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            ENTER THE NODURA
          </h2>
          <p className="text-white/40 max-w-xl mx-auto mb-10 text-lg">
            Join the network of initiative leaders shaping the future.
          </p>
          
          <JoinButton />
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/10"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold tracking-[0.2em] text-white">NODURA</span>
            </div>
            <p className="text-sm text-white/40 max-w-xs">
              The social ecosystem for initiative leaders.
            </p>
          </div>

          {/* Network */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Network</h4>
            <ul className="space-y-3">
              {["Directory", "Initiatives", "Events", "Resources"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{link}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3">
              {["Features", "Integrations", "API", "Changelog"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{link}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{link}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <p className="text-sm text-white/30">
              &copy; 2026 Nodura. All rights reserved.
            </p>
            {/* System Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <motion.div 
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-white/40 font-mono">OPERATIONAL</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Security"].map((link) => (
              <a key={link} href="#" className="text-sm text-white/30 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function JoinButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 6
      const y = (e.clientY - rect.top - rect.height / 2) / 6
      setPosition({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      animate={{ 
        x: position.x, 
        y: position.y,
        rotateX: -position.y / 2,
        rotateY: position.x / 2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 500 }}
    >
      <Button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        size="lg"
        className="relative overflow-hidden px-10 py-7 text-lg font-medium bg-white text-black hover:bg-white/90 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
      >
        <span className="relative z-10 flex items-center gap-2">
          Get Started
          <ArrowRight className="w-5 h-5" />
        </span>
        
        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
          />
        )}
      </Button>
    </motion.div>
  )
}
