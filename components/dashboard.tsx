"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  LayoutGrid, 
  Bell, 
  LogOut,
  Star,
  GripVertical,
  Send,
  Plus,
  UserPlus,
  Search,
  X,
  Check,
  Zap,
  Network
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardProps {
  onLogout: () => void
}

const volunteers = [
  { id: 1, name: "Sarah Chen", role: "Event Lead", score: 2450, avatar: "SC" },
  { id: 2, name: "Marcus Johnson", role: "Tech Coordinator", score: 2180, avatar: "MJ" },
  { id: 3, name: "Emily Rodriguez", role: "Design Lead", score: 1920, avatar: "ER" },
  { id: 4, name: "James Wilson", role: "Logistics", score: 1850, avatar: "JW" },
  { id: 5, name: "Aisha Patel", role: "Communications", score: 1720, avatar: "AP" },
]

const searchableMembers = [
  { id: 101, name: "Alex Thompson", role: "Strategy", avatar: "AT" },
  { id: 102, name: "Nina Garcia", role: "Marketing", avatar: "NG" },
  { id: 103, name: "David Park", role: "Engineering", avatar: "DP" },
  { id: 104, name: "Lisa Chang", role: "Product", avatar: "LC" },
]

const initialTasks = {
  todo: [
    { id: 1, title: "Review venue contracts", priority: "high" },
    { id: 2, title: "Confirm catering menu", priority: "medium" },
  ],
  inProgress: [
    { id: 3, title: "Setup registration system", priority: "high" },
    { id: 4, title: "Design event badges", priority: "low" },
  ],
  done: [
    { id: 5, title: "Book keynote speaker", priority: "high" },
    { id: 6, title: "Send save-the-date", priority: "medium" },
  ],
}

type Volunteer = typeof volunteers[number]
type TabType = "volunteers" | "tasks" | "broadcast" | "network"

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("volunteers")
  const [tasks, setTasks] = useState(initialTasks)
  const [draggedTask, setDraggedTask] = useState<{ id: number; from: keyof typeof initialTasks } | null>(null)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleDragStart = (taskId: number, from: keyof typeof initialTasks) => {
    setDraggedTask({ id: taskId, from })
  }

  const handleDrop = (to: keyof typeof initialTasks) => {
    if (!draggedTask || draggedTask.from === to) return
    
    const task = tasks[draggedTask.from].find(t => t.id === draggedTask.id)
    if (!task) return

    setTasks(prev => ({
      ...prev,
      [draggedTask.from]: prev[draggedTask.from].filter(t => t.id !== draggedTask.id),
      [to]: [...prev[to], task]
    }))
    setDraggedTask(null)
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      setIsLoggingOut(false)
      onLogout()
    }, 600)
  }

  const tabs = [
    { id: "volunteers" as TabType, label: "MEMBERS", icon: Users },
    { id: "tasks" as TabType, label: "TASKS", icon: LayoutGrid },
    { id: "broadcast" as TabType, label: "BROADCAST", icon: Bell },
    { id: "network" as TabType, label: "NETWORK", icon: Network },
  ]

  return (
    <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-sm font-bold tracking-[0.2em] text-white">COMMAND CENTER</span>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsAddMemberOpen(true)}
              size="sm"
              className="bg-white text-black hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </motion.div>
          
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-white/40 hover:text-white hover:bg-white/10"
          >
            {isLoggingOut ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative whitespace-nowrap ${
              activeTab === tab.id 
                ? "text-white" 
                : "text-white/40 hover:text-white/80"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="tracking-wide">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === "volunteers" && (
            <motion.div
              key="volunteers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <VolunteerTracking volunteers={volunteers} />
            </motion.div>
          )}
          {activeTab === "tasks" && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TaskBoard 
                tasks={tasks} 
                onDragStart={handleDragStart}
                onDrop={handleDrop}
              />
            </motion.div>
          )}
          {activeTab === "broadcast" && (
            <motion.div
              key="broadcast"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <BroadcastCenter />
            </motion.div>
          )}
          {activeTab === "network" && (
            <motion.div
              key="network"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ConnectionMap />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal 
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
      />
    </div>
  )
}

// Add Member Modal
interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [invitedMembers, setInvitedMembers] = useState<number[]>([])
  const [showSuccess, setShowSuccess] = useState<number | null>(null)

  const filteredMembers = searchableMembers.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInvite = (memberId: number) => {
    setShowSuccess(memberId)
    setTimeout(() => {
      setInvitedMembers(prev => [...prev, memberId])
      setShowSuccess(null)
    }, 800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-black border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Add Members</h3>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search by name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    autoFocus
                  />
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto px-4 pb-4">
                <div className="space-y-2">
                  {filteredMembers.map((member) => {
                    const isInvited = invitedMembers.includes(member.id)
                    const isInviting = showSuccess === member.id
                    
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{member.name}</div>
                          <div className="text-xs text-white/40">{member.role}</div>
                        </div>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => !isInvited && handleInvite(member.id)}
                            disabled={isInvited || isInviting}
                            size="sm"
                            variant={isInvited ? "outline" : "default"}
                            className={`min-w-[90px] ${
                              isInvited 
                                ? "border-white/20 text-white/60" 
                                : "bg-white text-black hover:bg-white/90"
                            }`}
                          >
                            {isInviting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                              />
                            ) : isInvited ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Invited
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-1" />
                                Invite
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                  
                  {filteredMembers.length === 0 && (
                    <div className="text-center py-8 text-white/40">
                      No members found matching &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function VolunteerTracking({ volunteers }: { volunteers: Volunteer[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Active Members</h3>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Star className="w-4 h-4 text-white" />
          <span>Social Capital</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {volunteers.map((volunteer, idx) => (
          <motion.div
            key={volunteer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white font-medium text-sm">
              {volunteer.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{volunteer.name}</span>
                {idx < 3 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                    className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                      idx === 0 ? "bg-white/20 text-white" :
                      idx === 1 ? "bg-white/10 text-white/60" :
                      "bg-white/5 text-white/40"
                    }`}
                  >
                    #{idx + 1}
                  </motion.div>
                )}
              </div>
              <span className="text-sm text-white/40">{volunteer.role}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-white">{volunteer.score.toLocaleString()}</div>
              <div className="text-xs text-white/30">points</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface TaskBoardProps {
  tasks: typeof initialTasks
  onDragStart: (id: number, from: keyof typeof initialTasks) => void
  onDrop: (to: keyof typeof initialTasks) => void
}

function TaskBoard({ tasks, onDragStart, onDrop }: TaskBoardProps) {
  const columns = [
    { id: "todo" as const, label: "TODO", color: "bg-white/10 text-white/60" },
    { id: "inProgress" as const, label: "IN PROGRESS", color: "bg-white/20 text-white" },
    { id: "done" as const, label: "DONE", color: "bg-white/5 text-white/40" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(column => (
        <div
          key={column.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(column.id)}
          className="space-y-3"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono ${column.color}`}>
            <span>{column.label}</span>
            <span className="opacity-60">({tasks[column.id].length})</span>
          </div>
          
          <div className="space-y-2 min-h-[200px] p-3 rounded-xl bg-white/5 border border-white/10">
            {tasks[column.id].map(task => (
              <motion.div
                key={task.id}
                draggable
                onDragStart={() => onDragStart(task.id, column.id)}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-black/50 border border-white/10 cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors"
              >
                <GripVertical className="w-4 h-4 text-white/20" />
                <span className="text-sm text-white flex-1">{task.title}</span>
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === "high" ? "bg-white" :
                  task.priority === "medium" ? "bg-white/50" :
                  "bg-white/20"
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BroadcastCenter() {
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [showSent, setShowSent] = useState(false)

  const handleSend = () => {
    if (!message.trim()) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setShowSent(true)
      setMessage("")
      setTimeout(() => setShowSent(false), 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Broadcast Message</h3>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Users className="w-4 h-4" />
          <span className="font-mono">2,847 recipients</span>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="flex flex-wrap gap-2">
        {["Meeting Reminder", "Event Update", "Urgent Notice", "Schedule Change"].map(template => (
          <motion.button
            key={template}
            onClick={() => setMessage(`[${template.toUpperCase()}] `)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/40 hover:bg-white/10 hover:text-white transition-colors"
          >
            {template}
          </motion.button>
        ))}
      </div>

      {/* Message Input */}
      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your broadcast message..."
          className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-white/20 transition-colors"
        />
        
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white/40 hover:text-white">
            <Plus className="w-4 h-4 mr-1" />
            Attach
          </Button>
          
          <AnimatePresence mode="wait">
            {showSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 text-white"
              >
                <Check className="w-4 h-4" />
                <span>Sent!</span>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={handleSend}
                  disabled={isSending || !message.trim()}
                  className="bg-white text-black hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  {isSending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Broadcast
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Connection Map visualization
function ConnectionMap() {
  // Generate node positions in a circle
  const nodeCount = 12
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2
    const radius = 120
    return {
      id: i,
      x: 150 + Math.cos(angle) * radius,
      y: 150 + Math.sin(angle) * radius,
      name: `Node ${i + 1}`,
      connections: Math.floor(Math.random() * 5) + 1,
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Connection Map</h3>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Network className="w-4 h-4" />
          <span className="font-mono">Real-time</span>
        </div>
      </div>

      <div className="flex justify-center">
        <svg width="300" height="300" className="overflow-visible">
          {/* Connection lines */}
          {nodes.map((node, i) => 
            nodes.slice(i + 1).map((target, j) => {
              if (Math.random() > 0.6) {
                return (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                )
              }
              return null
            })
          )}
          
          {/* Center node */}
          <motion.circle
            cx="150"
            cy="150"
            r="8"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          />
          
          {/* Outer nodes */}
          {nodes.map((node, i) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r="6"
              fill="rgba(255,255,255,0.3)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
              whileHover={{ scale: 1.5, fill: "white" }}
              className="cursor-pointer"
            />
          ))}
          
          {/* Pulse animation on center */}
          <motion.circle
            cx="150"
            cy="150"
            r="8"
            fill="none"
            stroke="white"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-xl bg-white/5">
          <div className="text-2xl font-bold text-white">184</div>
          <div className="text-xs text-white/40">Total Nodes</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5">
          <div className="text-2xl font-bold text-white">2.4K</div>
          <div className="text-xs text-white/40">Connections</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5">
          <div className="text-2xl font-bold text-white">98%</div>
          <div className="text-xs text-white/40">Uptime</div>
        </div>
      </div>
    </div>
  )
}
