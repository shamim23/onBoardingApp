import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ComponentType = 'about' | 'address' | 'birthdate';
export type PageConfig = ComponentType[];

interface AdminStore {
  pageTwo: PageConfig;
  pageThree: PageConfig;
  setPageConfig: (page: 'two' | 'three', components: ComponentType[]) => void;
}

export const useAdminStore = create<AdminStore>(
  persist(
    (set) => ({
      pageTwo: ['about', 'birthdate'],
      pageThree: ['address'],
      setPageConfig: (page, components) =>
        set((state) => ({
          ...(page === 'two' ? { pageTwo: components } : { pageThree: components }),
        })),
    }),
    {
      name: 'page-config-storage', // Unique name for the storage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);
