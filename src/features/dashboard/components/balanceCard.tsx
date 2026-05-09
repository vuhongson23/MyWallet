import Card from "@/src/components/ui/card";
import Text from "@/src/shared/components/Text";
import { View } from "react-native";
import SummaryCard from "./SummaryCard";

export default function BalanceCard() {
  return (
    <Card cardStyle={{ overflow: "hidden", marginBottom: 14, padding: 20 }}>
      <View
        style={{
          position: "absolute",
          top: -40,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: "#7c6fe023",
        }}
      />
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
            fontSize: 12,
          }}
        >
          Số dư hiện tại
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
          Tháng 5
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            color: "#9896B0",
            fontSize: 18,
          }}
        >
          ₫
        </Text>
        <Text
          style={{
            color: "#F0EFF8",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          7.500.000
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <SummaryCard amount={12000000} type="income" />
        <SummaryCard amount={4500000} type="expense" />
      </View>
    </Card>
  );
}
