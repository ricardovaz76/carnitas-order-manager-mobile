import { createContext, useContext } from "react";

export const AppResumeContext = createContext<number>(0);

export function useAppResume(): number {
  return useContext(AppResumeContext);
}