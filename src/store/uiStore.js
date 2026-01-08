import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      appTheme: 'hybrid', // 'hybrid', 'minimal', 'dark', 'neon', '3d'
      setAppTheme: (theme) => set({ appTheme: theme }),
      
      toasts: [],
      addToast: (message, type = 'info') => {
        const id = Date.now();
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 3000);
      },
      removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ appTheme: state.appTheme }),
    }
  )
);
