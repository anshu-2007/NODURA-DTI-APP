"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { CommandCenter, AuthDrawer } from "@/components/command-center"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)

  const handleSignIn = () => {
    setIsAuthOpen(true)
  }

  const handleGetStarted = () => {
    const portal = document.getElementById("portal")
    if (portal) {
      portal.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleAuthSuccess = () => {
    setAuthSuccess(true)
    // Scroll to portal after successful auth
    setTimeout(() => {
      const portal = document.getElementById("portal")
      if (portal) {
        portal.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navigation onSignIn={handleSignIn} onGetStarted={handleGetStarted} />
      <HeroSection onGetStarted={handleGetStarted} onSignIn={handleSignIn} />
      <section id="features">
        <BentoGrid />
      </section>
      <section id="portal">
        <CommandCenter />
      </section>
      <FooterSection />
      
      {/* Auth Drawer - triggered from navigation */}
      <AuthDrawer 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </main>
  )
}
