// Types for Expense Management App

export type ExpenseCategory =
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "house"
  | "health"
  | "education"
  | "other";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string; // ISO format
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTotal {
  category: ExpenseCategory;
  total: number;
  count: number;
}

export interface ExpenseStats {
  totalExpenses: number;
  totalAmount: number;
  categoryTotals: CategoryTotal[];
  averageExpense: number;
}

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: "Ăn uống",
  transport: "Giao thông",
  entertainment: "Giải trí",
  shopping: "Mua sắm",
  house: "Nhà ở",
  health: "Sức khỏe",
  education: "Giáo dục",
  other: "Khác",
};

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  food: "#FF6B6B",
  transport: "#4ECDC4",
  entertainment: "#FFE66D",
  shopping: "#FF8C42",
  house: "#95E1D3",
  health: "#F38181",
  education: "#AA96DA",
  other: "#CCCCCC",
};
