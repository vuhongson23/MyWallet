import {
    CATEGORY_COLORS,
    CATEGORY_LABELS,
    ExpenseCategory,
} from "@/src/types/expense";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "./themed-text";

interface CategorySelectorProps {
  selectedCategory: ExpenseCategory;
  onSelectCategory: (category: ExpenseCategory) => void;
}

const CATEGORIES: ExpenseCategory[] = [
  "food",
  "transport",
  "entertainment",
  "shopping",
  "utilities",
  "health",
  "education",
  "other",
];

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

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Danh mục</ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => onSelectCategory(category)}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  selectedCategory === category
                    ? CATEGORY_COLORS[category]
                    : CATEGORY_COLORS[category] + "40",
                borderColor:
                  selectedCategory === category
                    ? CATEGORY_COLORS[category]
                    : "transparent",
              },
            ]}
          >
            <Text style={styles.emoji}>{getCategoryEmoji(category)}</Text>
            <ThemedText style={styles.categoryName}>
              {CATEGORY_LABELS[category]}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  scrollView: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 12,
    borderWidth: 2,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: "600",
  },
});
