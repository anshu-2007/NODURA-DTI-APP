"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navLinks = [
  { label: "Network", href: "#network" },
  { label: "Directory", href: "#directory" },
  { label: "Command", href: "#portal" },
]

interface NavigationProps {
  onSignIn: () => void
  onGetStarted: () => void
}

export function Navigation({ onSignIn, onGetStarted }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationCount] = useState(3)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sample member suggestions for search
  const suggestions = [
    { name: "Alex Chen", role: "Product Lead", avatar: "AC" },
    { name: "Sarah Kim", role: "Design Director", avatar: "SK" },
    { name: "Marcus Johnson", role: "Engineering", avatar: "MJ" },
  ].filter(m => 
    searchQuery && m.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl border border-white/10 py-3" 
            : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-[0.2em] text-white">Nodura</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors tracking-wide relative group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <motion.div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white/50 hover:text-white hover:bg-white/10"
              >
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Notifications with 3D badge */}
            <motion.div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white/50 hover:text-white hover:bg-white/10"
              >
                <Bell className="w-5 h-5" />
              </Button>
              {notificationCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                  {notificationCount}
                </motion.div>
              )}
            </motion.div>

            <div className="w-px h-6 bg-white/10 mx-2" />

            <Button 
              variant="ghost" 
              onClick={onSignIn}
              className="text-white/50 hover:text-white hover:bg-white/10"
            >
              Sign In
            </Button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={onGetStarted}
                className="bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Floating Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  autoFocus
                />
              </div>
              
              {/* Suggestions with blur-in transition */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    className="mt-3 space-y-2"
                  >
                    {suggestions.map((member, i) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="text-sm text-white">{member.name}</div>
                          <div className="text-xs text-white/40">{member.role}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-50 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-white/80 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onSignIn()
                  }}
                  className="w-full justify-center text-white/60 hover:text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onGetStarted()
                  }}
                  className="w-full justify-center bg-white text-black hover:bg-white/90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close search/menu */}
      <AnimatePresence>
        {(isSearchOpen || isMobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsSearchOpen(false)
              setIsMobileMenuOpen(false)
            }}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </>
  )
}
