import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { StatCard } from "@/src/components/StatCard";
import { ThemedText } from "@/src/components/themed-text";
import { ThemedView } from "@/src/components/themed-view";
import { useExpense } from "@/src/context/ExpenseContext";
import { ExpenseUtils } from "@/src/services/expense-utils";

export default function AnalyticsScreen() {
  const { expenses, stats, clearAllExpenses } = useExpense();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const monthExpenses = expenses.filter((e) => {
    const expenseDate = new Date(e.date);
    return (
      expenseDate.getFullYear() === selectedMonth.getFullYear() &&
      expenseDate.getMonth() === selectedMonth.getMonth()
    );
  });

  const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const monthStats = ExpenseUtils.calculateStats(monthExpenses);

  const handleClearAllExpenses = () => {
    Alert.alert(
      "Xóa tất cả chi tiêu",
      "Bạn chắc chắn muốn xóa tất cả dữ liệu chi tiêu?",
      [
        { text: "Hủy", onPress: () => {}, style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            clearAllExpenses().then(() => {
              Alert.alert("Thành công", "Tất cả dữ liệu đã bị xóa");
            });
          },
          style: "destructive",
        },
      ],
    );
  };

  const getTopCategories = () => {
    return monthStats.categoryTotals
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Phân tích
          </ThemedText>
        </View>

        {/* Month Summary Card */}
        <View style={styles.monthCard}>
          <ThemedText style={styles.monthLabel}>
            Tháng {selectedMonth.getMonth() + 1}/{selectedMonth.getFullYear()}
          </ThemedText>
          <ThemedText style={styles.monthAmount}>
            {ExpenseUtils.formatCurrency(monthTotal)}
          </ThemedText>
          <ThemedText style={styles.monthSubtext}>
            {monthExpenses.length} giao dịch
          </ThemedText>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            label="Trung bình/giao dịch"
            value={ExpenseUtils.formatCurrency(monthStats.averageExpense)}
            icon="📈"
            color="#FF6B6B"
          />
          <StatCard
            label="Số danh mục"
            value={`${monthStats.categoryTotals.length}`}
            icon="📂"
            color="#4ECDC4"
          />
        </View>

        {/* Top Categories */}
        {getTopCategories().length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Danh mục hàng đầu
            </ThemedText>
            <View style={styles.categoryList}>
              {getTopCategories().map((cat, index) => {
                const percentage =
                  monthTotal > 0
                    ? ((cat.total / monthTotal) * 100).toFixed(1)
                    : "0";
                return (
                  <View key={cat.category} style={styles.categoryItem}>
                    <View style={styles.categoryInfo}>
                      <ThemedText style={styles.categoryName}>
                        {index + 1}. {cat.category}
                      </ThemedText>
                      <ThemedText style={styles.categoryStats}>
                        {cat.count} giao dịch • {percentage}%
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.categoryAmount}>
                      {ExpenseUtils.formatCurrency(cat.total)}
                    </ThemedText>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Additional Stats */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Thống kê tổng quát
          </ThemedText>
          <View style={styles.statsList}>
            <View style={styles.statRow}>
              <View style={styles.statLabelContainer}>
                <MaterialIcons
                  name="calendar-today"
                  size={20}
                  color="#4ECDC4"
                />
                <ThemedText style={styles.statLabel}>Tổng cộng</ThemedText>
              </View>
              <ThemedText style={styles.statValue}>
                {ExpenseUtils.formatCurrency(stats.totalAmount)}
              </ThemedText>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statLabelContainer}>
                <MaterialIcons name="shopping-cart" size={20} color="#FFE66D" />
                <ThemedText style={styles.statLabel}>
                  Tất cả giao dịch
                </ThemedText>
              </View>
              <ThemedText style={styles.statValue}>
                {stats.totalExpenses}
              </ThemedText>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statLabelContainer}>
                <MaterialIcons name="trending-down" size={20} color="#FF6B6B" />
                <ThemedText style={styles.statLabel}>
                  Trung bình chung
                </ThemedText>
              </View>
              <ThemedText style={styles.statValue}>
                {ExpenseUtils.formatCurrency(stats.averageExpense)}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Quản lý dữ liệu
          </ThemedText>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearAllExpenses}
          >
            <MaterialIcons name="delete-forever" size={20} color="#FF6B6B" />
            <ThemedText style={styles.dangerButtonText}>
              Xóa tất cả chi tiêu
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={20} color="#4ECDC4" />
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoText}>
                💡 <ThemedText style={styles.infoBold}>Mẹo:</ThemedText> Quản lý
                chi tiêu thường xuyên để kiểm soát tài chính tốt hơn.
              </ThemedText>
            </View>
          </View>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  monthCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#FF8C42",
    alignItems: "center",
  },
  monthLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  monthAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 8,
  },
  monthSubtext: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
  },
  statsGrid: {
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
  categoryList: {
    borderRadius: 12,
    overflow: "hidden",
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  categoryStats: {
    fontSize: 12,
    opacity: 0.7,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statsList: {
    borderRadius: 12,
    overflow: "hidden",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFE6E6",
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B6B",
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#E8F8F5",
  },
  infoContent: {
    flex: 1,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
  },
  infoBold: {
    fontWeight: "600",
  },
  bottomPadding: {
    height: 32,
  },
});
