import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      appTheme: 'dark', // Fixed to dark/modern as per requirement
      // setAppTheme: (theme) => set({ appTheme: theme }), // Disabled logic
      
      editorWidth: 50,
      setEditorWidth: (width) => set({ editorWidth: width }),

      activeMobileTab: 'editor', // 'editor' | 'preview'
      setActiveMobileTab: (tab) => set({ activeMobileTab: tab }),

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
      partialize: (state) => ({ appTheme: state.appTheme, editorWidth: state.editorWidth }),
    }
  )
);
