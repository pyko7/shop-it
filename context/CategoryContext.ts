import { createContext } from "react";

export interface StateProps {
  category: string | null;
  setCategory: (category: string) => void;
}

export const CategoryContext = createContext<StateProps | null>(null);
