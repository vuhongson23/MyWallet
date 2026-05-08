import Text from "@/src/shared/components/Text";
import { View } from "react-native";

const transactions = [
  {
    id: "1",
    title: "Ăn trưa",
    amount: 50000,
  },
  {
    id: "2",
    title: "Cafe",
    amount: 35000,
  },
  {
    id: "3",
    title: "Lương",
    amount: 12000000,
  },
];

export default function RecentTransactionList() {
  return (
    <View
      style={{
        marginTop: 30,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        Giao dịch gần đây
      </Text>

      {transactions.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,

            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{item.title}</Text>

          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {item.amount.toLocaleString()}đ
          </Text>
        </View>
      ))}
    </View>
  );
}
