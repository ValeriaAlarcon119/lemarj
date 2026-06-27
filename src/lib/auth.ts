"use client";
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export type UserRole = 'admin' | 'client' | null

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  role: UserRole
  role_requested: UserRole
  company_history: string | null
  catalog_url: string | null
  onboarding_completed: boolean
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      const isSuperAdmin = authUser?.email === 'valerialarcon119@gmail.com'

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code === 'PGRST116') {
        console.log("No profile found, attempting to create one...")
        const role = isSuperAdmin ? 'admin' : 'client'
        
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: userId, 
              role: role, 
              full_name: authUser?.user_metadata?.full_name || 'Nuevo Usuario',
              onboarding_completed: false,
              role_requested: isSuperAdmin ? 'admin' : 'client'
            }
          ])
          .select()
          .single()

        if (!createError && newProfile) {
          console.log("Profile created successfully:", newProfile)
          setProfile(newProfile as Profile)
        } else {
          console.error("Error creating profile:", createError)
        }
      } else if (data) {
        if (isSuperAdmin && data.role !== 'admin') {
          await supabase.from('profiles').update({ role: 'admin' }).eq('id', userId)
          setProfile({ ...data, role: 'admin' } as Profile)
        } else {
          setProfile(data as Profile)
        }
      }
    } catch (err) {
      console.error('Error in auth:', err)
    } finally {
      setLoading(false)
    }
  }

  return { user, profile, loading, setProfile }
}
