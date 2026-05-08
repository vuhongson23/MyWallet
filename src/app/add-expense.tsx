import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useExpense } from "@/src/context/ExpenseContext";
import { ExpenseUtils } from "@/src/services/expense-utils";
import { Expense, ExpenseCategory } from "@/src/types/expense";
import { CategorySelector } from "../components/CategorySelector";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";

export default function AddExpenseScreen() {
  const router = useRouter();
  const { addExpense } = useExpense();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleAddExpense = async () => {
    if (!amount || !description) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      const expense: Omit<Expense, "id" | "createdAt" | "updatedAt"> = {
        amount: parseFloat(amount),
        category,
        description,
        date: date.toISOString().split("T")[0],
      };

      await addExpense(expense);
      Alert.alert("Thành công", "Thêm chi tiêu thành công");
      router.back();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm chi tiêu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Amount Input */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Số tiền</ThemedText>
          <View style={styles.amountInputContainer}>
            <ThemedText style={styles.currencySymbol}>₫</ThemedText>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Mô tả</ThemedText>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Nhập mô tả chi tiêu..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />
        </View>

        {/* Category Selector */}
        <CategorySelector
          selectedCategory={category}
          onSelectCategory={setCategory}
        />

        {/* Date Picker */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Ngày</ThemedText>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <ThemedText style={styles.dateButtonText}>
              {ExpenseUtils.formatDate(date.toISOString())}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addButton, loading && styles.addButtonDisabled]}
          onPress={handleAddExpense}
          disabled={loading}
        >
          <ThemedText style={styles.addButtonText}>
            {loading ? "Đang lưu..." : "Thêm chi tiêu"}
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 8,
    color: "#4ECDC4",
  },
  amountInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionInput: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    fontSize: 14,
    textAlignVertical: "top",
  },
  dateButton: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
  },
  dateButtonText: {
    fontSize: 14,
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#4ECDC4",
    alignItems: "center",
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomPadding: {
    height: 16,
  },
});
