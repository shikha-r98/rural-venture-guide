import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { budgets, villageById, villages, villagesByState } from "./grambiz-data";
import { states } from "./india-data";

const defaultVillage = villages.find((v) => v.id === "pb-raipura") ?? villages[0]!;

type Ctx = {
  stateId: string;
  setStateId: (id: string) => void;
  villageId: string;
  setVillageId: (id: string) => void;
  budget: number;
  setBudget: (b: number) => void;
};

const AppStateContext = createContext<Ctx>({
  stateId: defaultVillage.stateId,
  setStateId: () => {},
  villageId: defaultVillage.id,
  setVillageId: () => {},
  budget: budgets[3]!.value,
  setBudget: () => {},
});

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [stateId, setStateIdState] = useState(defaultVillage.stateId);
  const [villageId, setVillageIdState] = useState(defaultVillage.id);
  const [budget, setBudgetState] = useState(budgets[3]!.value);

  useEffect(() => {
    const s = window.localStorage.getItem("grambiz-state");
    const v = window.localStorage.getItem("grambiz-village");
    const b = window.localStorage.getItem("grambiz-budget");
    if (s && states.some((x) => x.id === s)) setStateIdState(s);
    if (v && villages.some((x) => x.id === v)) setVillageIdState(v);
    if (b) setBudgetState(Number(b));
  }, []);

  const setStateId = (id: string) => {
    setStateIdState(id);
    window.localStorage.setItem("grambiz-state", id);
    const first = villagesByState(id)[0];
    if (first) {
      setVillageIdState(first.id);
      window.localStorage.setItem("grambiz-village", first.id);
    }
  };
  const setVillageId = (id: string) => {
    setVillageIdState(id);
    window.localStorage.setItem("grambiz-village", id);
    const v = villageById(id);
    setStateIdState(v.stateId);
    window.localStorage.setItem("grambiz-state", v.stateId);
  };
  const setBudget = (b: number) => {
    setBudgetState(b);
    window.localStorage.setItem("grambiz-budget", String(b));
  };

  return (
    <AppStateContext.Provider
      value={{ stateId, setStateId, villageId, setVillageId, budget, setBudget }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}

export function useVillage() {
  const { villageId } = useAppState();
  return villageById(villageId);
}
