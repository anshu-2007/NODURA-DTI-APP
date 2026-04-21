"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

// Pre-computed particle positions to avoid hydration mismatch
const particleData = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  angle: (i / 80) * Math.PI * 2,
  radius: 100 + (i % 5) * 30,
  speed: 0.4 + (i % 4) * 0.2,
  size: 1 + (i % 3),
  delay: (i % 10) * 0.2,
}))

const phrases = [
  "ELIMINATE THE COLD START",
  "UNIFY THE FRAGMENTED",
  "ARCHITECT THE FUTURE",
]

interface HeroSectionProps {
  onGetStarted?: () => void
  onSignIn?: () => void
}

export function HeroSection({ onGetStarted, onSignIn }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Phrase rotation with glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setTimeout(() => setIsGlitching(false), 150)
      }, 150)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      mouseX.set(x * 50)
      mouseY.set(y * 50)
    }
  }, [mouseX, mouseY])

  const particles = useMemo(() => particleData, [])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Pulsing Background - Heartbeat effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
        
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3D Particle Nodura/Sphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="relative w-[600px] h-[600px]"
          style={{
            rotateX: springY,
            rotateY: springX,
            transformStyle: "preserve-3d",
          }}
        >
          {mounted && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                width: particle.size,
                height: particle.size,
                left: '50%',
                top: '50%',
                boxShadow: particle.size > 2 ? '0 0 6px rgba(255,255,255,0.5)' : 'none',
              }}
              animate={{
                x: [
                  Math.cos(particle.angle) * particle.radius,
                  Math.cos(particle.angle + Math.PI * 0.5) * particle.radius * 0.8,
                  Math.cos(particle.angle + Math.PI) * particle.radius,
                  Math.cos(particle.angle + Math.PI * 1.5) * particle.radius * 0.8,
                  Math.cos(particle.angle + Math.PI * 2) * particle.radius,
                ],
                y: [
                  Math.sin(particle.angle) * particle.radius * 0.5,
                  Math.sin(particle.angle + Math.PI * 0.5) * particle.radius,
                  Math.sin(particle.angle + Math.PI) * particle.radius * 0.5,
                  Math.sin(particle.angle + Math.PI * 1.5) * particle.radius,
                  Math.sin(particle.angle + Math.PI * 2) * particle.radius * 0.5,
                ],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 10 / particle.speed,
                repeat: Infinity,
                ease: "linear",
                delay: particle.delay,
              }}
            />
          ))}
          
          {/* Center glow orb */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
              filter: "blur(15px)",
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Mouse Follower Spotlight */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(800px circle at calc(50% + var(--mx)) calc(50% + var(--my)), rgba(255,255,255,0.04), transparent 40%)`,
          // @ts-expect-error CSS custom properties
          "--mx": `${springX.get()}px`,
          "--my": `${springY.get()}px`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-sm font-semibold tracking-[0.4em] text-white">Nodura</span>
          </div>
        </motion.div>

        {/* Glitch Text Animation */}
        <div className="relative h-[100px] md:h-[140px] lg:h-[160px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentPhrase}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight absolute"
            >
              <motion.span 
                className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent inline-block"
                animate={isGlitching ? {
                  x: [0, -3, 3, -2, 0],
                  textShadow: [
                    "0 0 0 transparent",
                    "-2px 0 #ff0000, 2px 0 #00ffff",
                    "2px 0 #ff0000, -2px 0 #00ffff",
                    "-1px 0 #ff0000, 1px 0 #00ffff",
                    "0 0 0 transparent",
                  ]
                } : {}}
                transition={{ duration: 0.15 }}
              >
                {phrases[currentPhrase]}
              </motion.span>
            </motion.h1>
          </AnimatePresence>
          
          {/* Glitch scan line */}
          <AnimatePresence>
            {isGlitching && (
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-white/30"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 0.15 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          The social ecosystem where initiative leaders connect, collaborate, and scale their impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagnetButton primary onClick={onGetStarted}>
            Enter the Nodura
            <ArrowRight className="ml-2 w-4 h-4" />
          </MagnetButton>
          
          <MagnetButton onClick={onSignIn}>
            Sign In
          </MagnetButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 flex items-center justify-center gap-12 md:gap-16"
        >
          {[
            { value: "2.4K+", label: "Active Leaders" },
            { value: "180+", label: "Initiatives" },
            { value: "98%", label: "Connection Rate" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/30 uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1 h-2 bg-white/50 rounded-full"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Magnet Button with spring physics and perspective tilt
interface MagnetButtonProps {
  children: React.ReactNode
  primary?: boolean
  onClick?: () => void
}

function MagnetButton({ children, primary, onClick }: MagnetButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 4
      const y = (e.clientY - rect.top - rect.height / 2) / 4
      setPosition({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    onClick?.()
  }

  return (
    <motion.div
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isPressed ? 0.95 : isHovered ? 1.02 : 1,
        rotateX: -position.y / 2,
        rotateY: position.x / 2,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ perspective: 500 }}
    >
      <Button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        variant={primary ? "default" : "outline"}
        size="lg"
        className={`
          relative overflow-hidden px-8 py-6 text-base font-medium transition-all duration-300
          ${primary 
            ? "bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.25)]" 
            : "border-white/20 text-white hover:bg-white/5 hover:border-white/40 backdrop-blur-sm"
          }
        `}
      >
        <span className="relative z-10 flex items-center">
          {children}
        </span>
        
        {/* Shimmer effect on hover */}
        {primary && isHovered && (
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
