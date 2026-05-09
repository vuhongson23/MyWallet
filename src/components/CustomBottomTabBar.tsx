import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomBottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function CustomBottomTabBar({
  state,
  descriptors,
  navigation,
}: CustomBottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: "index", label: "Dashboard", icon: "home" },
    { name: "transactions", label: "Giao dịch", icon: "swap-horizontal" },
    { name: "add", label: "Thêm", icon: "plus", isCenter: true },
    { name: "reports", label: "Báo cáo", icon: "bar-chart" },
    { name: "wallets", label: "Cài nhập", icon: "wallet" },
  ];

  const handleAddPress = () => {
    navigation.navigate("add-expense");
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          if (tab.isCenter) {
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.centerButton}
                onPress={handleAddPress}
                activeOpacity={0.8}
              >
                <View style={styles.floatingButton}>
                  <Ionicons name="add" size={32} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          }

          const routeName = state.routes[index]?.name;
          const isFocused = state.index === index;
          const descriptor = descriptors[state.routes[index]?.key];

          if (!descriptor) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[index].name, {
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: state.routes[index].key,
            });
          };

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={24}
                color={isFocused ? "#7C6FE0" : "#999"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(15, 15, 20, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "#2A2A32",
    paddingTop: 0,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  centerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7C6FE0",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C6FE0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
