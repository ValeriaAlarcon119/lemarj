"use client";
import { ClientDashboard } from '@/components/Dashboard/ClientDashboard';

export default function WorkspacePage() {
  // En Next.js App Router podrías obtener el perfil desde una cookie o Prisma SSR
  const mockProfile = {
    id: 'mock-1',
    full_name: 'Cliente Demo',
    phone: null,
    role: 'client' as const,
    role_requested: 'client' as const,
    company_history: null,
    catalog_url: null,
    onboarding_completed: false
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <ClientDashboard 
        profile={mockProfile} 
        onUpdate={() => {}} 
        activeTab="dashboard" 
      />
    </div>
  );
}
