import {
    CategoryTotal,
    Expense,
    ExpenseCategory,
    ExpenseStats,
} from "@/src/types/expense";

export class ExpenseUtils {
  static generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static calculateStats(expenses: Expense[]): ExpenseStats {
    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

    const categoryTotals: Record<ExpenseCategory, CategoryTotal> = {
      food: { category: "food", total: 0, count: 0 },
      transport: { category: "transport", total: 0, count: 0 },
      entertainment: { category: "entertainment", total: 0, count: 0 },
      shopping: { category: "shopping", total: 0, count: 0 },
      utilities: { category: "utilities", total: 0, count: 0 },
      health: { category: "health", total: 0, count: 0 },
      education: { category: "education", total: 0, count: 0 },
      other: { category: "other", total: 0, count: 0 },
    };

    expenses.forEach((expense) => {
      categoryTotals[expense.category].total += expense.amount;
      categoryTotals[expense.category].count += 1;
    });

    return {
      totalExpenses: expenses.length,
      totalAmount,
      categoryTotals: Object.values(categoryTotals).filter(
        (ct) => ct.count > 0,
      ),
      averageExpense: expenses.length > 0 ? totalAmount / expenses.length : 0,
    };
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  static formatDateShort(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }

  static getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  static groupExpensesByDate(expenses: Expense[]): Record<string, Expense[]> {
    const grouped: Record<string, Expense[]> = {};

    expenses.forEach((expense) => {
      const date = expense.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(expense);
    });

    return grouped;
  }

  static sortExpensesByDate(expenses: Expense[], descending = true): Expense[] {
    return [...expenses].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return descending ? dateB - dateA : dateA - dateB;
    });
  }
}
