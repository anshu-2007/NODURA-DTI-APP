"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  UserPlus, 
  Sparkles, 
  Check, 
  TrendingUp,
  MessageSquare,
  Briefcase,
  Code,
  Palette,
  Users,
  Rocket
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample member data
const members = [
  { id: 1, name: "Alex Chen", role: "Product Lead", avatar: "AC", socialCapital: 94, skills: ["Strategy", "Leadership"] },
  { id: 2, name: "Sarah Kim", role: "Design Director", avatar: "SK", socialCapital: 89, skills: ["Design", "UX"] },
  { id: 3, name: "Marcus Johnson", role: "Engineering", avatar: "MJ", socialCapital: 91, skills: ["React", "Node.js"] },
  { id: 4, name: "Emily Davis", role: "Growth Lead", avatar: "ED", socialCapital: 87, skills: ["Marketing", "Analytics"] },
  { id: 5, name: "James Wilson", role: "Operations", avatar: "JW", socialCapital: 85, skills: ["Ops", "Automation"] },
  { id: 6, name: "Nina Patel", role: "Content Strategy", avatar: "NP", socialCapital: 92, skills: ["Content", "SEO"] },
]

// Pulse feed events
const pulseEvents = [
  { type: "join", name: "Michael Scott", time: "2m ago" },
  { type: "project", name: "Project Aurora", time: "5m ago" },
  { type: "join", name: "Lisa Park", time: "8m ago" },
  { type: "milestone", name: "1000 members", time: "12m ago" },
  { type: "join", name: "David Kim", time: "15m ago" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

export function BentoGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [followedMembers, setFollowedMembers] = useState<number[]>([])
  const [confettiMember, setConfettiMember] = useState<number | null>(null)

  const handleFollow = (memberId: number) => {
    if (followedMembers.includes(memberId)) {
      setFollowedMembers(prev => prev.filter(id => id !== memberId))
    } else {
      setFollowedMembers(prev => [...prev, memberId])
      setConfettiMember(memberId)
      setTimeout(() => setConfettiMember(null), 1000)
    }
  }

  return (
    <section id="directory" ref={ref} className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            THE NETWORK
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Connect with initiative leaders shaping the future
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Pulse Feed - Tall card */}
          <motion.div variants={itemVariants} className="lg:row-span-2">
            <PulseFeed />
          </motion.div>

          {/* Member Cards */}
          {members.slice(0, 4).map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <MemberCard 
                member={member}
                isFollowed={followedMembers.includes(member.id)}
                showConfetti={confettiMember === member.id}
                onFollow={() => handleFollow(member.id)}
              />
            </motion.div>
          ))}

          {/* Stats Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <NetworkStats />
          </motion.div>

          {/* Remaining Members */}
          {members.slice(4).map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <MemberCard 
                member={member}
                isFollowed={followedMembers.includes(member.id)}
                showConfetti={confettiMember === member.id}
                onFollow={() => handleFollow(member.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Pulse Feed Component
function PulseFeed() {
  const [events, setEvents] = useState(pulseEvents)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Simulate new events
  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        type: "join" as const,
        name: `User ${Math.floor(Math.random() * 1000)}`,
        time: "Just now"
      }
      setEvents(prev => [newEvent, ...prev.slice(0, 4)])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full min-h-[400px] bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden"
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div 
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05), transparent 40%)`
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-mono text-white/50 tracking-wider">LIVE PULSE</span>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {events.map((event, i) => (
              <motion.div
                key={`${event.name}-${i}`}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  {event.type === "join" && <UserPlus className="w-4 h-4 text-white/60" />}
                  {event.type === "project" && <Rocket className="w-4 h-4 text-white/60" />}
                  {event.type === "milestone" && <Sparkles className="w-4 h-4 text-white/60" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{event.name}</div>
                  <div className="text-xs text-white/30">
                    {event.type === "join" ? "joined the network" : 
                     event.type === "project" ? "launched" : "reached"}
                  </div>
                </div>
                <div className="text-xs text-white/20">{event.time}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// Member Card with 3D tilt and follow functionality
interface MemberCardProps {
  member: typeof members[0]
  isFollowed: boolean
  showConfetti: boolean
  onFollow: () => void
}

function MemberCard({ member, isFollowed, showConfetti, onFollow }: MemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setTilt({ x: y * 10, y: -x * 10 })
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const skillIcons: Record<string, React.ElementType> = {
    "Strategy": Briefcase,
    "Leadership": Users,
    "Design": Palette,
    "UX": Palette,
    "React": Code,
    "Node.js": Code,
    "Marketing": TrendingUp,
    "Analytics": TrendingUp,
    "Ops": Briefcase,
    "Automation": Code,
    "Content": MessageSquare,
    "SEO": TrendingUp,
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 overflow-hidden"
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div 
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 40%)`
          }}
        />
      )}

      {/* Confetti/Ripple effect on follow */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{ 
                  x: "50%", 
                  y: "50%", 
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  x: `${50 + Math.cos(i * 45 * Math.PI / 180) * 80}%`,
                  y: `${50 + Math.sin(i * 45 * Math.PI / 180) * 80}%`,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            ))}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-white"
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* 3D Profile Picture */}
        <motion.div 
          className="relative mb-4"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-lg font-semibold text-white border border-white/10">
            {member.avatar}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black border border-white/20 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        </motion.div>

        {/* Info */}
        <h3 className="text-base font-semibold text-white mb-1">{member.name}</h3>
        <p className="text-sm text-white/40 mb-3">{member.role}</p>

        {/* Social Capital Score */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-white/40 to-white"
              initial={{ width: 0 }}
              animate={{ width: `${member.socialCapital}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
          <span className="text-xs font-mono text-white/60">{member.socialCapital}</span>
        </div>

        {/* Floating Skills */}
        <div className="flex gap-2 mb-4">
          {member.skills.map((skill) => {
            const IconComponent = skillIcons[skill] || Code
            return (
              <motion.div
                key={skill}
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                title={skill}
              >
                <IconComponent className="w-4 h-4 text-white/50" />
              </motion.div>
            )
          })}
        </div>

        {/* Follow Button */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onFollow}
            variant={isFollowed ? "outline" : "default"}
            size="sm"
            className={`w-full transition-all duration-300 ${
              isFollowed 
                ? "border-white/20 text-white/60 hover:bg-white/5" 
                : "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            }`}
          >
            {isFollowed ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Following
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Follow
              </span>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Network Stats
function NetworkStats() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const stats = [
    { label: "Total Members", value: "2,847", change: "+127 this week" },
    { label: "Active Initiatives", value: "184", change: "+12 this month" },
    { label: "Connections Made", value: "15.4K", change: "+2.1K this week" },
  ]

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden"
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div 
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05), transparent 40%)`
          }}
        />
      )}

      <div className="relative z-10">
        <h3 className="text-xs font-mono text-white/40 tracking-wider mb-6">NETWORK METRICS</h3>
        
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/40 mb-1">{stat.label}</div>
              <div className="text-xs text-white/20">{stat.change}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
