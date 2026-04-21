"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { 
  Shield, 
  Fingerprint, 
  Scan, 
  Lock, 
  ArrowRight,
  X,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dashboard } from "@/components/dashboard"

export function CommandCenter() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full mb-6">
            <Zap className="w-4 h-4 text-white/60" />
            <span className="text-sm font-medium text-white/60 tracking-wide">COMMAND CENTER</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            ORGANIZER PORTAL
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Access the full power of the Nodura ecosystem
          </p>
        </motion.div>

        {/* Portal Access */}
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="portal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto"
            >
              <motion.div 
                className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
                whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Lock className="w-10 h-10 text-white/40" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">SECURE ACCESS</h3>
                <p className="text-white/40 mb-8">Authenticate to access the Command Center</p>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => setIsLoginOpen(true)}
                    className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-medium shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <Fingerprint className="w-5 h-5 mr-2" />
                    ACCESS PORTAL
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Dashboard onLogout={() => setIsAuthenticated(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-screen Login Overlay */}
        <LoginOverlay 
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSuccess={() => {
            setIsAuthenticated(true)
            setIsLoginOpen(false)
          }}
        />
      </div>
    </section>
  )
}

// Full-screen Login Overlay
interface LoginOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

function LoginOverlay({ isOpen, onClose, onSuccess }: LoginOverlayProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanPhase, setScanPhase] = useState(0)

  const handleLogin = () => {
    setIsScanning(true)
    setScanPhase(1)
    
    // Phase progression
    const phases = [1, 2, 3, 4]
    phases.forEach((phase, i) => {
      setTimeout(() => setScanPhase(phase), i * 600)
    })
    
    setTimeout(() => {
      setIsScanning(false)
      setScanPhase(0)
      onSuccess()
    }, 2800)
  }

  const handleClose = () => {
    if (!isScanning) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Background with grid animation */}
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Animated grid */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            
            {/* Radial pulse */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleClose}
            className="absolute top-8 right-8 z-10 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </motion.button>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative z-10 w-full max-w-lg px-4"
          >
            <div className="text-center">
              {/* Biometric Scanner */}
              <div className="relative w-48 h-48 mx-auto mb-10">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/10"
                  animate={isScanning ? { 
                    scale: [1, 1.1, 1],
                    borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                
                {/* Inner frame */}
                <div className="absolute inset-4 rounded-xl border border-white/20">
                  {/* Corner decorations */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-white/60" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-white/60" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-white/60" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-white/60" />
                </div>
                
                {/* Scan line */}
                {isScanning && (
                  <motion.div
                    initial={{ top: "16px" }}
                    animate={{ top: ["16px", "calc(100% - 16px)", "16px"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{ boxShadow: "0 0 20px rgba(255,255,255,0.5)" }}
                  />
                )}
                
                {/* Fingerprint Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={isScanning ? { 
                      scale: [1, 1.1, 1], 
                      opacity: [0.4, 1, 0.4] 
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Fingerprint className={`w-24 h-24 transition-colors duration-300 ${
                      isScanning ? 'text-white' : 'text-white/30'
                    }`} />
                  </motion.div>
                </div>
                
                {/* Success glow */}
                {scanPhase >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 rounded-full bg-white/10 blur-xl"
                  />
                )}
              </div>

              {/* Status */}
              <motion.h2
                key={isScanning ? "scanning" : "ready"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2 tracking-wider"
              >
                {isScanning ? "AUTHENTICATING" : "IDENTITY VERIFICATION"}
              </motion.h2>
              
              <p className="text-sm text-white/40 font-mono tracking-wider mb-8">
                {isScanning ? "SCANNING BIOMETRICS..." : "SYSTEM READY"}
              </p>

              {/* Terminal output */}
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  className="mb-8 p-5 rounded-xl bg-black/50 border border-white/10 text-left overflow-hidden"
                >
                  <div className="font-mono text-sm space-y-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-white/30">[SYS]</span>
                      <span className="text-white/60">Establishing secure tunnel...</span>
                      {scanPhase >= 1 && <span className="text-white">OK</span>}
                    </motion.div>
                    
                    {scanPhase >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-white/30">[BIO]</span>
                        <span className="text-white/60">Scanning fingerprint matrix...</span>
                        {scanPhase >= 2 && <span className="text-white">MATCH</span>}
                      </motion.div>
                    )}
                    
                    {scanPhase >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-white/30">[SEC]</span>
                        <span className="text-white/60">Decrypting access tokens...</span>
                        {scanPhase >= 3 && <span className="text-white">VALID</span>}
                      </motion.div>
                    )}
                    
                    {scanPhase >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 pt-2 border-t border-white/10"
                      >
                        <span className="text-white font-bold">{">"} ACCESS GRANTED</span>
                        <span className="text-white/40">Welcome, Organizer</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Login Form */}
              {!isScanning && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 max-w-sm mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="organizer@nodura.network"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 text-center"
                  />
                  <Input
                    type="password"
                    placeholder="••••••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 text-center"
                  />
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleLogin}
                      className="w-full bg-white text-black hover:bg-white/90 py-7 text-base font-medium shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                      <Scan className="w-5 h-5 mr-2" />
                      INITIATE SCAN
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Export the auth drawer separately for use from navigation
interface AuthDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AuthDrawer({ isOpen, onClose, onSuccess }: AuthDrawerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanPhase, setScanPhase] = useState(0)

  const handleLogin = () => {
    setIsScanning(true)
    setScanPhase(1)
    
    const phases = [1, 2, 3, 4]
    phases.forEach((phase, i) => {
      setTimeout(() => setScanPhase(phase), i * 500)
    })
    
    setTimeout(() => {
      setIsScanning(false)
      setScanPhase(0)
      onSuccess()
      onClose()
    }, 2500)
  }

  const handleClose = () => {
    if (!isScanning) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Drawer from right */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-black border-l border-white/10 p-8 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-full flex flex-col justify-center">
              <div className="text-center">
                {/* Biometric Scanner */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-xl border border-white/20">
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-white/60" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-white/60" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-white/60" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-white/60" />
                  </div>
                  
                  {isScanning && (
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isScanning ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Fingerprint className={`w-20 h-20 ${isScanning ? 'text-white' : 'text-white/30'}`} />
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {isScanning ? "AUTHENTICATING" : "SIGN IN"}
                </h3>
                <p className="text-sm text-white/40 font-mono mb-8">
                  {isScanning ? "SCANNING..." : "ENTER CREDENTIALS"}
                </p>
                
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10 text-left"
                  >
                    <div className="font-mono text-xs text-white/60 space-y-1">
                      {scanPhase >= 1 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{"> Connecting..."}</motion.p>}
                      {scanPhase >= 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{"> Verifying..."}</motion.p>}
                      {scanPhase >= 3 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{"> Decrypting..."}</motion.p>}
                      {scanPhase >= 4 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">{"> ACCESS GRANTED"}</motion.p>}
                    </div>
                  </motion.div>
                )}

                {!isScanning && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <Input
                      type="email"
                      placeholder="organizer@nodura.network"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                    />
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleLogin}
                        className="w-full bg-white text-black hover:bg-white/90 py-6 font-medium shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        <Scan className="w-4 h-4 mr-2" />
                        SIGN IN
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
