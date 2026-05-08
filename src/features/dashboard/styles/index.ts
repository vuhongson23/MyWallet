import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textNormal: {
    fontSize: 12,
    color: "#9896B0",
  },
  textMedium: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  // Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 30,
  },
  // Balance Card
  balanceCardWrapper: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#17171F",
    borderColor: "#7c6fe042",
    borderWidth: 1,
    overflow: "hidden",
  },
});
