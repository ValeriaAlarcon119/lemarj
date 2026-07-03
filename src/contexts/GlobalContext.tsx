"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile, OnboardingData } from '@/lib/auth';
import type { User } from '@supabase/supabase-js';

interface GlobalState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  updateOnboardingState: (data: Partial<OnboardingData>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const GlobalContext = createContext<GlobalState>({} as GlobalState);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (!error) {
        setProfile((data as Profile) || null);
      } else {
        console.warn("GlobalContext fetchProfile warning:", error);
      }
    } catch (err) {
      console.error("GlobalContext fetchProfile exception:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1 sola llamada a Supabase al cargar la app para hidratar la sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateOnboardingState = async (newData: Partial<OnboardingData>) => {
    if (!profile || !user) return;
    
    const updatedData = {
      ...(profile.onboarding_data || {}),
      ...newData
    } as OnboardingData;

    // Actualización Optimista UI
    setProfile(prev => prev ? { ...prev, onboarding_data: updatedData } : prev);

    // Guardado en Base de Datos (JSONB)
    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_data: updatedData })
      .eq('id', user.id);
      
    if (error) {
      console.error("Error saving onboarding_data:", error);
      // Opcional: Revertir si hay error
    }
  };

  return (
    <GlobalContext.Provider value={{ user, profile, isLoading, updateOnboardingState, refreshProfile: () => user ? fetchProfile(user.id) : Promise.resolve() }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalState = () => useContext(GlobalContext);
