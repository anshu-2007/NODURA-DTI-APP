"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Folder, FileText, DollarSign, Users, ChevronRight } from "lucide-react"

const folders = [
  { 
    id: 1, 
    name: "Sponsorships", 
    icon: DollarSign, 
    count: 24,
    files: ["Q4 Sponsors.pdf", "Partnership Deck.pptx"]
  },
  { 
    id: 2, 
    name: "Event Budgets", 
    icon: FileText, 
    count: 18,
    files: ["Annual Gala 2024.xlsx", "Conference Budget.xlsx"]
  },
  { 
    id: 3, 
    name: "Vendor Lists", 
    icon: Users, 
    count: 42,
    files: ["Catering Partners.csv", "AV Vendors.csv"]
  },
]

export function MemoryVault() {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {folders.map((folder) => (
        <motion.div
          key={folder.id}
          onClick={() => setSelectedFolder(selectedFolder === folder.id ? null : folder.id)}
          className="cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className={`
            flex items-center gap-3 p-3 rounded-xl transition-all duration-200
            ${selectedFolder === folder.id ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-transparent hover:bg-white/8'}
          `}>
            {/* 3D Folder Icon */}
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center border border-white/10">
                <folder.icon className="w-5 h-5 text-white/70" />
              </div>
              {/* Depth shadow */}
              <div className="absolute inset-0 rounded-lg bg-white/5 translate-x-0.5 translate-y-0.5 -z-10" />
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{folder.name}</div>
              <div className="text-xs text-white/40">{folder.count} templates</div>
            </div>
            
            <motion.div
              animate={{ rotate: selectedFolder === folder.id ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-white/40" />
            </motion.div>
          </div>
          
          {/* Expanded Files */}
          <motion.div
            initial={false}
            animate={{ 
              height: selectedFolder === folder.id ? "auto" : 0,
              opacity: selectedFolder === folder.id ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-12 pt-2 space-y-1">
              {folder.files.map((file, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-xs text-white/60"
                >
                  <FileText className="w-3 h-3" />
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
