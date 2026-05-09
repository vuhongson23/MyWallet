import { CustomBottomTabBar } from "@/src/components/CustomBottomTabBar";
import DashboardScreen from "@/src/features/dashboard/screens/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ReportsScreen from "./reports";
import TransactionsScreen from "./transactions";
import WalletsScreen from "./wallets";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="index"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name="transactions"
        component={TransactionsScreen}
        options={{ title: "Giao dịch" }}
      />
      <Tab.Screen
        name="add"
        component={() => null}
        options={{ title: "Thêm" }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="reports"
        component={ReportsScreen}
        options={{ title: "Báo cáo" }}
      />
      <Tab.Screen
        name="wallets"
        component={WalletsScreen}
        options={{ title: "Cài nhập" }}
      />
    </Tab.Navigator>
  );
}
