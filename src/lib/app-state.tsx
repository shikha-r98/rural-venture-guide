import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { villages, budgets } from "./grambiz-data";

type Ctx = {
  villageId: string;
  setVillageId: (id: string) => void;
  budget: number;
  setBudget: (b: number) => void;
};

const AppStateContext = createContext<Ctx>({
  villageId: villages[0]!.id,
  setVillageId: () => {},
  budget: budgets[2]!.value,
  setBudget: () => {},
});

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [villageId, setVillageIdState] = useState(villages[0]!.id);
  const [budget, setBudgetState] = useState(budgets[2]!.value);

  useEffect(() => {
    const v = window.localStorage.getItem("grambiz-village");
    const b = window.localStorage.getItem("grambiz-budget");
    if (v && villages.some((x) => x.id === v)) setVillageIdState(v);
    if (b) setBudgetState(Number(b));
  }, []);

  const setVillageId = (id: string) => {
    setVillageIdState(id);
    window.localStorage.setItem("grambiz-village", id);
  };
  const setBudget = (b: number) => {
    setBudgetState(b);
    window.localStorage.setItem("grambiz-budget", String(b));
  };

  return (
    <AppStateContext.Provider value={{ villageId, setVillageId, budget, setBudget }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}

export function useVillage() {
  const { villageId } = useAppState();
  return villages.find((v) => v.id === villageId) ?? villages[0]!;
}
