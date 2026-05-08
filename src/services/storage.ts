import { Expense } from "@/src/types/expense";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EXPENSES_KEY = "@kittycash/expenses";

class StorageService {
  async getExpenses(): Promise<Expense[]> {
    try {
      const data = await AsyncStorage.getItem(EXPENSES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading expenses:", error);
      return [];
    }
  }

  async saveExpense(expense: Expense): Promise<void> {
    try {
      const expenses = await this.getExpenses();

      const existingIndex = expenses.findIndex((e) => e.id === expense.id);
      if (existingIndex > -1) {
        expenses[existingIndex] = expense;
      } else {
        expenses.push(expense);
      }

      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving expense:", error);
      throw error;
    }
  }

  async deleteExpense(id: string): Promise<void> {
    try {
      const expenses = await this.getExpenses();
      const filtered = expenses.filter((e) => e.id !== id);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  }

  async clearAllExpenses(): Promise<void> {
    try {
      await AsyncStorage.removeItem(EXPENSES_KEY);
    } catch (error) {
      console.error("Error clearing expenses:", error);
      throw error;
    }
  }

  async getExpensesForDate(date: string): Promise<Expense[]> {
    try {
      const expenses = await this.getExpenses();
      return expenses.filter((e) => e.date === date);
    } catch (error) {
      console.error("Error getting expenses for date:", error);
      return [];
    }
  }

  async getExpensesForMonth(year: number, month: number): Promise<Expense[]> {
    try {
      const expenses = await this.getExpenses();
      return expenses.filter((e) => {
        const expenseDate = new Date(e.date);
        return (
          expenseDate.getFullYear() === year && expenseDate.getMonth() === month
        );
      });
    } catch (error) {
      console.error("Error getting expenses for month:", error);
      return [];
    }
  }
}

export const storageService = new StorageService();
