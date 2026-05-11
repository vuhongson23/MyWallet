import { CATEGORY_LABELS } from "@/src/types/expense";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getCategoryEmoji } from "../shared/utils/categoryEmoji";

const CATEGORIES = [
  "food",
  "transport",
  "entertainment",
  "shopping",
  "house",
  "health",
  "education",
  "other",
];

// function getCategoryEmoji(category: string): string {
//   const emojiMap: Record<string, string> = {
//     food: "🍴",
//     transport: "🚗",
//     entertainment: "🎬",
//     shopping: "🛒",
//     utilities: "💡",
//     health: "💊",
//     education: "📚",
//     other: "⋯",
//   };
//   return emojiMap[category] || "📌";
// }

interface CategorySelectorGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategorySelectorGrid({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Danh mục</Text>
      <ScrollView scrollEnabled={false}>
        <View style={styles.grid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => onSelectCategory(category)}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.categoryItemSelected,
              ]}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.categoryBox,
                  selectedCategory === category && styles.categoryBoxSelected,
                ]}
              >
                <View
                  style={[
                    styles.emojiContainer,
                    selectedCategory === category &&
                      styles.emojiContainerSelected,
                  ]}
                >
                  <Text style={styles.emoji}>{getCategoryEmoji(category)}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category && styles.categoryNameSelected,
                ]}
              >
                {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: "#9896B0",
    fontWeight: "500",
    marginBottom: 12,
    marginHorizontal: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 12,
  },
  categoryItem: {
    width: "22%",
    alignItems: "center",
  },
  categoryItemSelected: {},
  categoryBox: {
    width: 75,
    height: 75,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7C6FE042",
    backgroundColor: "#17171F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryBoxSelected: {
    borderColor: "#7C6FE0",
    borderWidth: 2,
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#7c6fe023",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiContainerSelected: {
    backgroundColor: "#7c6fe055",
  },
  emoji: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 12,
    color: "#9896B0",
    fontWeight: "500",
    textAlign: "center",
  },
  categoryNameSelected: {
    color: "#F0EFF8",
  },
});
