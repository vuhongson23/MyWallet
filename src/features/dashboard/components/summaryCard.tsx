import DownRightArrowIcon from "@/src/assets/icons/DownRightArrowIcon";
import UpRightArrowIcon from "@/src/assets/icons/UpRightArrowIcon";
import Text from "@/src/shared/components/Text";
import { View } from "react-native";

interface Props {
  amount: number;
  type: "income" | "expense";
}

export default function SummaryCard({ amount, type }: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff12",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        {type === "income" ? <UpRightArrowIcon /> : <DownRightArrowIcon />}
        <Text
          style={{
            color: "#9896B0",
            fontSize: 11,
            marginBottom: 3,
          }}
        >
          {type === "income" ? "Thu nhập" : "Chi tiêu"}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          marginTop: 8,
          color: type === "income" ? "#3DD68C" : "#F06A6A",
        }}
      >
        {amount.toLocaleString()}
      </Text>
    </View>
  );
}
