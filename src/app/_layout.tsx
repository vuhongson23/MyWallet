import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { ExpenseProvider } from "@/src/context/ExpenseContext";
import { useColorScheme } from "../shared/hooks/use-color-scheme.web";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    "DMSans-Light": require("@/src/assets/fonts/DMSans_18pt-Light.ttf"),
    "DMSans-Regular": require("@/src/assets/fonts/DMSans_18pt-Regular.ttf"),
    "DMSans-Medium": require("@/src/assets/fonts/DMSans_18pt-Medium.ttf"),
    "DMSans-Bold": require("@/src/assets/fonts/DMSans_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ExpenseProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-expense"
            options={{
              presentation: "modal",
              title: "Thêm chi tiêu",
              headerBackTitle: "Quay lại",
            }}
          />
          <Stack.Screen
            name="edit-expense"
            options={{
              presentation: "modal",
              title: "Chỉnh sửa chi tiêu",
              headerBackTitle: "Quay lại",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ExpenseProvider>
  );
}
