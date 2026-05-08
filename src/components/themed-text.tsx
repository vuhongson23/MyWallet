import { Platform, StyleSheet, type TextProps } from "react-native";
import Text from "../shared/components/Text";
import { Fonts } from "../shared/constants/theme";
import { useThemeColor } from "../shared/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Platform.OS !== "web" ? "DMSans-Regular" : Fonts.sans,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: Platform.OS !== "web" ? "DMSans-Medium" : Fonts.sans,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: Platform.OS !== "web" ? "DMSans-Bold" : Fonts.sans,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Platform.OS !== "web" ? "DMSans-Bold" : Fonts.sans,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: Platform.OS !== "web" ? "DMSans-Regular" : Fonts.sans,
  },
});
