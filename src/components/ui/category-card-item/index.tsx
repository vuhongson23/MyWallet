import Text from "@/src/shared/components/Text";
import { getCategoryEmoji } from "@/src/shared/utils/categoryEmoji";
import { ExpenseCategory } from "@/src/types/expense";
import React from "react";
import { View } from "react-native";

interface CategoryCardItemProps {
  title: string;
  categoryType: ExpenseCategory;
  categoryName: string;
  time: string;
  amount: string;
  type: "income" | "expense";
}

const CategoryCardItem = ({
  title,
  categoryType,
  categoryName,
  time,
  amount,
  type,
}: CategoryCardItemProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ffffff11",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            backgroundColor: "#7c6fe023",
            width: 40,
            height: 40,
          }}
        >
          <Text>{getCategoryEmoji(categoryType)}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 13, color: "#F0EFF8" }}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 5,
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                color: "#9896B0",
                fontSize: 11,
              }}
            >
              {categoryName}
            </Text>
            <View
              style={{
                width: 3,
                height: 3,
                backgroundColor: "#9896B0",
                borderRadius: 30,
              }}
            ></View>
            <Text
              style={{
                color: "#9896B0",
                fontSize: 12,
              }}
            >
              {time}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 13,
            color: type === "income" ? "#3DD68C" : "#F06A6A",
          }}
        >
          {type === "income" ? `+${amount}` : `-${amount}`}
        </Text>
      </View>
    </View>
  );
};

export default CategoryCardItem;
