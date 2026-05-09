import Card from "@/src/components/ui/card";
import Text from "@/src/shared/components/Text";
import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const ExpenseCategoryCard = () => {
  const categories = [
    { name: "Ăn uống", percentage: 38, color: "#A594F7" },
    { name: "Di chuyển", percentage: 22, color: "#3DD68C" },
    { name: "Mua sắm", percentage: 13, color: "#F06A6A" },
    { name: "Khác", percentage: 27, color: "#F5A623" },
  ];

  const renderLegend = (text: string, color: string, percentage: number) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 9,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: color || "white",
            }}
          />
          <Text style={{ color: "#9896B0", fontSize: 14 }}>{text || ""}</Text>
        </View>
        <Text style={{ color: color, fontSize: 14, fontWeight: "600" }}>
          {percentage}%
        </Text>
      </View>
    );
  };

  return (
    <Card
      title="Chi tiêu theo danh mục"
      cardStyle={{
        marginBottom: 14,
      }}
    >
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <PieChart
          donut
          radius={50}
          innerRadius={35}
          data={[
            { value: 38, color: "#A594F7" },
            { value: 22, color: "#3DD68C" },
            { value: 13, color: "#F06A6A" },
            { value: 27, color: "#F5A623" },
          ]}
          innerCircleColor="#17171F"
          centerLabelComponent={() => {
            return (
              <View>
                <Text
                  style={{ color: "#F0EFF8", fontSize: 15, fontWeight: "bold" }}
                >
                  ₫11.5M
                </Text>
                <Text
                  style={{
                    color: "#9896B0",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  tháng 5
                </Text>
              </View>
            );
          }}
        />
        <View style={{ flex: 1 }}>
          {categories.map((cat, index) => (
            <View key={index}>
              {renderLegend(cat.name, cat.color, cat.percentage)}
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};

export default ExpenseCategoryCard;
