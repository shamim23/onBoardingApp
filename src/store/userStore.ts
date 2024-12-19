import { create } from 'zustand';

export interface UserData {
  email: string;
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
  }
  password: string;
  about?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  birthdate?: string;
}

interface UserStore {
  currentStep: number;
  userData: UserData;
  setStep: (step: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
  setLastCompletedStep: (step: number) => void;
}

export const useUserStore = create<UserStore>((set,get) => ({
  currentStep: 1,
  userData: {
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    email: '',
    password: '',
    about: '',

    birthdate: '',
  },
  setStep: (step) => set({ currentStep: step }),
  updateUserData: (data) => {
   
    set((state) => {
      const newUserData = { ...state.userData, ...data };
      return { userData: newUserData };
    });
  },
}));