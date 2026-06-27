"use client";
import React from "react"
import { Sidebar } from "./Sidebar"
import { BottomNav } from "./BottomNav"
import type { Profile } from "@/lib/auth"

interface MainLayoutProps {
  children: React.ReactNode
  profile: Profile | null
  activeTab: string
  onTabChange: (tab: string) => void
  isPublic?: boolean
}

export function MainLayout({ children, profile, activeTab, onTabChange, isPublic = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* BACKGROUND GRID (Global background effect) */}
      <div className="fixed inset-0 pointer-events-none -z-20 
        dark:bg-[linear-gradient(rgba(192,132,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(192,132,252,0.05)_1px,transparent_1px)] 
        bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] 
        bg-[size:50px_50px]" 
      />

      <Sidebar 
        profile={profile} 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
      />

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        isPublic={isPublic} 
      />

      <main className="lg:pl-[75px] pb-16 lg:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  )
}
