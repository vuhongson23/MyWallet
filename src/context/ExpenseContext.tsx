import { ExpenseUtils } from "@/src/services/expense-utils";
import { storageService } from "@/src/services/storage";
import { Expense, ExpenseStats } from "@/src/types/expense";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface ExpenseContextType {
  expenses: Expense[];
  stats: ExpenseStats;
  loading: boolean;
  addExpense: (
    expense: Omit<Expense, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  updateExpense: (
    id: string,
    expense: Omit<Expense, "id" | "createdAt">,
  ) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  clearAllExpenses: () => Promise<void>;
  refreshExpenses: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stats, setStats] = useState<ExpenseStats>(
    ExpenseUtils.calculateStats([]),
  );
  const [loading, setLoading] = useState(true);

  const refreshExpenses = async () => {
    try {
      const loadedExpenses = await storageService.getExpenses();
      setExpenses(loadedExpenses);
      setStats(ExpenseUtils.calculateStats(loadedExpenses));
    } catch (error) {
      console.error("Error refreshing expenses:", error);
    }
  };

  useEffect(() => {
    refreshExpenses().finally(() => setLoading(false));
  }, []);

  const addExpense = async (
    expense: Omit<Expense, "id" | "createdAt" | "updatedAt">,
  ) => {
    const now = new Date().toISOString();
    const newExpense: Expense = {
      ...expense,
      id: ExpenseUtils.generateId(),
      createdAt: now,
      updatedAt: now,
    };

    await storageService.saveExpense(newExpense);
    await refreshExpenses();
  };

  const updateExpense = async (
    id: string,
    expense: Omit<Expense, "id" | "createdAt">,
  ) => {
    const updated: Expense = {
      ...expense,
      id,
      createdAt:
        expenses.find((e) => e.id === id)?.createdAt ||
        new Date().toISOString(),
    };

    await storageService.saveExpense(updated);
    await refreshExpenses();
  };

  const deleteExpense = async (id: string) => {
    await storageService.deleteExpense(id);
    await refreshExpenses();
  };

  const clearAllExpenses = async () => {
    await storageService.clearAllExpenses();
    await refreshExpenses();
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: ExpenseUtils.sortExpensesByDate(expenses),
        stats,
        loading,
        addExpense,
        updateExpense,
        deleteExpense,
        clearAllExpenses,
        refreshExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpense must be used within ExpenseProvider");
  }
  return context;
}
