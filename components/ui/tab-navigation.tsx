'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Tab = {
  id: string
  label: string
}

type TabNavigationProps = {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function TabNavigation({ tabs, activeTab, onChange, className }: TabNavigationProps) {
  return (
    <div className={cn("flex w-full", className)}>
      <div className="inline-flex items-center justify-center bg-white/70 dark:bg-zinc-800/80 rounded-sm p-1 backdrop-blur-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium rounded-sm transition-colors duration-200",
                isActive 
                  ? "text-zinc-950 dark:text-zinc-200" 
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-pill"
                  className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700/70 rounded-sm"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
} 