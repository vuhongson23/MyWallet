import Text from "@/src/shared/components/Text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

export function StatCard({
  label,
  value,
  icon,
  color = "#4ECDC4",
}: StatCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={[styles.icon, { backgroundColor: color + "20" }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <ThemedText style={styles.value}>{value}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 8,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 24,
  },
  content: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
