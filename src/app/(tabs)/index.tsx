import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ExpenseItem } from "@/src/components/ExpenseItem";
import { StatCard } from "@/src/components/StatCard";
import { ThemedText } from "@/src/components/themed-text";
import { ThemedView } from "@/src/components/themed-view";
import { useExpense } from "@/src/context/ExpenseContext";
import { ExpenseUtils } from "@/src/services/expense-utils";

export default function HomeScreen() {
  const router = useRouter();
  const { expenses, stats, loading, deleteExpense } = useExpense();

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  const recentExpenses = expenses.slice(0, 10);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          KittyCash
        </ThemedText>
        <TouchableOpacity
          onPress={() => router.push("/add-expense")}
          style={styles.addButton}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Total Amount Card */}
        <View style={styles.totalCard}>
          <ThemedText style={styles.totalLabel}>Tổng chi tiêu</ThemedText>
          <ThemedText style={styles.totalAmount}>
            {ExpenseUtils.formatCurrency(stats.totalAmount)}
          </ThemedText>
          <ThemedText style={styles.totalSubtext}>
            {stats.totalExpenses} giao dịch
          </ThemedText>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            label="Trung bình"
            value={ExpenseUtils.formatCurrency(stats.averageExpense)}
            icon="📊"
            color="#4ECDC4"
          />
          <StatCard
            label="Danh mục"
            value={`${stats.categoryTotals.length}`}
            icon="📂"
            color="#FFE66D"
          />
        </View>

        {/* Category Breakdown */}
        {stats.categoryTotals.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Chi tiêu theo danh mục
            </ThemedText>
            <View style={styles.categoriesList}>
              {stats.categoryTotals.map((cat) => (
                <View key={cat.category} style={styles.categoryRow}>
                  <ThemedText style={styles.categoryNameText}>
                    {cat.category}
                  </ThemedText>
                  <ThemedText style={styles.categoryAmountText}>
                    {ExpenseUtils.formatCurrency(cat.total)}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recent Expenses */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Chi tiêu gần đây
          </ThemedText>
          {recentExpenses.length > 0 ? (
            <View>
              {recentExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onPress={() => router.push(`/edit-expense?id=${expense.id}`)}
                  onDelete={() => deleteExpense(expense.id)}
                  showDelete
                />
              ))}
            </View>
          ) : (
            <ThemedView style={styles.emptyState}>
              <MaterialIcons name="receipt" size={48} color="#ccc" />
              <ThemedText style={styles.emptyText}>
                Chưa có chi tiêu nào
              </ThemedText>
              <ThemedText style={styles.emptySubtext}>
                Nhấn nút + để thêm chi tiêu
              </ThemedText>
            </ThemedView>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4ECDC4",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  totalCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#4ECDC4",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 8,
  },
  totalSubtext: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 0,
    paddingHorizontal: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  categoriesList: {
    borderRadius: 12,
    overflow: "hidden",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryNameText: {
    fontSize: 14,
    fontWeight: "500",
  },
  categoryAmountText: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  bottomPadding: {
    height: 32,
  },
});
