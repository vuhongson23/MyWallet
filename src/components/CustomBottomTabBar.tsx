import { useBottomSheet } from "@/src/context/BottomSheetContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { tabs } from "../shared/constants/tabBar";

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
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const { isVisible, toggleBottomSheet } = useBottomSheet();

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isVisible ? 135 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 135],
    outputRange: ["0deg", "135deg"],
  });

  const handleAddPress = () => {
    toggleBottomSheet();
  };

  const getTabProps = (index: number) => {
    const route = state.routes[index];
    const isFocused = state.index === index;

    if (!descriptors[route?.key]) return null;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, { merge: true });
      }
    };

    const onLongPress = () => {
      navigation.emit({ type: "tabLongPress", target: route.key });
    };

    return { isFocused, onPress, onLongPress };
  };

  return (
    <View style={styles.container}>
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
                <Animated.View
                  style={[
                    styles.floatingButton,
                    {
                      transform: [{ rotate: rotation }],
                    },
                  ]}
                >
                  <Ionicons name="add" size={32} color="#fff" />
                </Animated.View>
              </TouchableOpacity>
            );
          }

          const tabProps = getTabProps(index);
          if (!tabProps) return null;

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={tabProps.onPress}
              onLongPress={tabProps.onLongPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={24}
                color={tabProps.isFocused ? "#7C6FE0" : "#999"}
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
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 65,
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
    marginBottom: 0,
  },
  floatingButton: {
    width: 55,
    height: 55,
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
