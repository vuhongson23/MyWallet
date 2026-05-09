import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WalletsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cài nhập</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F14",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
