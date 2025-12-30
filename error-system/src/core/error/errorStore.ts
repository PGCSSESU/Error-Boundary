import { create } from "zustand";
import type { AppError } from "./errorTypes";

type ErrorStore = {
  errors: AppError[];
  lastAction: (() => void) | null;
  logError: (error: AppError) => void;
  setLastAction: (action: () => void) => void;
};

export const useErrorStore = create<ErrorStore>((set) => ({
  errors: [],
  lastAction: null,

  logError: (error) =>
    set((state) => ({
      errors: [...state.errors, error],
    })),

  setLastAction: (action) =>
    set(() => ({
      lastAction: action,
    })),
}));
