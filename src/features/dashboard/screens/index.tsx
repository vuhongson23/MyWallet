import { ScrollView, View } from "react-native";

import BalanceCard from "../components/balanceCard";
import Header from "../components/header";
import RecentTransactionList from "../components/recentTransactions";

export default function DashboardScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0F0F14",
      }}
    >
      <View
        style={{
          padding: 20,
          paddingTop: 60,
          flex: 1,
        }}
      >
        <Header />

        <BalanceCard />

        <RecentTransactionList />
      </View>
    </ScrollView>
  );
}
