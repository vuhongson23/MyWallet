import { ExpenseUtils } from "@/src/services/expense-utils";
import Text from "@/src/shared/components/Text";
import { CATEGORY_COLORS, CATEGORY_LABELS, Expense } from "@/src/types/expense";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ExpenseItemProps {
  expense: Expense;
  onPress?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export function ExpenseItem({
  expense,
  onPress,
  onDelete,
  showDelete = false,
}: ExpenseItemProps) {
  const categoryColor = CATEGORY_COLORS[expense.category];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={styles.container}>
        <View style={[styles.categoryIcon, { backgroundColor: categoryColor }]}>
          <Text style={styles.categoryEmoji}>
            {getCategoryEmoji(expense.category)}
          </Text>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.description}>
            {expense.description}
          </ThemedText>
          <View style={styles.details}>
            <ThemedText style={styles.category}>
              {CATEGORY_LABELS[expense.category]}
            </ThemedText>
            <ThemedText style={styles.date}>
              {ExpenseUtils.formatDateShort(expense.date)}
            </ThemedText>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <ThemedText style={styles.amount}>
            {ExpenseUtils.formatCurrency(expense.amount)}
          </ThemedText>
          {showDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <MaterialIcons name="close" size={18} color="#FF6B6B" />
            </TouchableOpacity>
          )}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    food: "🍔",
    transport: "🚗",
    entertainment: "🎬",
    shopping: "🛍️",
    utilities: "💡",
    health: "💊",
    education: "📚",
    other: "📌",
  };
  return emojiMap[category] || "📌";
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    fontSize: 12,
    opacity: 0.7,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
  amountContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 8,
    padding: 4,
  },
});
