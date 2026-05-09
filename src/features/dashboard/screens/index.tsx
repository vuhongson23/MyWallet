import { ScrollView, View } from "react-native";

import BalanceCard from "../components/BalanceCard";
import ExpenseCategoryCard from "../components/ExpenseCategoryCard";
import Header from "../components/Header";
import RecentTransactionList from "../components/RecentTransactions";

export default function DashboardScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0F0F14",
      }}
      stickyHeaderIndices={[0]}
    >
      <View
        style={{
          padding: 20,
          paddingTop: 60,
          backgroundColor: "#0F0F14",
          zIndex: 10,
        }}
      >
        <Header />
      </View>
      <View
        style={{
          padding: 20,
          paddingTop: 0,
          flex: 1,
        }}
      >
        <BalanceCard />
        <ExpenseCategoryCard />
        <RecentTransactionList />
      </View>
    </ScrollView>
  );
}
