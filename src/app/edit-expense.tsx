import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

export default function EditExpenseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { expenses, updateExpense, deleteExpense } = useExpense();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const expenseId = params.id as string;

  useEffect(() => {
    if (expenseId) {
      const expense = expenses.find((e) => e.id === expenseId);
      if (expense) {
        setAmount(expense.amount.toString());
        setDescription(expense.description);
        setCategory(expense.category);
        setDate(new Date(expense.date));
      }
    }
    setInitialLoading(false);
  }, [expenseId, expenses]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleUpdateExpense = async () => {
    if (!amount || !description) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      const expense: Omit<Expense, "id" | "createdAt"> = {
        amount: parseFloat(amount),
        category,
        description,
        date: date.toISOString().split("T")[0],
        updatedAt: new Date().toISOString(),
      };

      await updateExpense(expenseId, expense);
      Alert.alert("Thành công", "Cập nhật chi tiêu thành công");
      router.back();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật chi tiêu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = () => {
    Alert.alert("Xóa chi tiêu", "Bạn chắc chắn muốn xóa chi tiêu này?", [
      { text: "Hủy", onPress: () => {}, style: "cancel" },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            await deleteExpense(expenseId);
            Alert.alert("Thành công", "Xóa chi tiêu thành công");
            router.back();
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa chi tiêu");
            console.error(error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  if (initialLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

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

        {/* Update Button */}
        <TouchableOpacity
          style={[styles.updateButton, loading && styles.updateButtonDisabled]}
          onPress={handleUpdateExpense}
          disabled={loading}
        >
          <ThemedText style={styles.updateButtonText}>
            {loading ? "Đang lưu..." : "Cập nhật"}
          </ThemedText>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteExpense}
          disabled={loading}
        >
          <MaterialIcons name="delete" size={20} color="#FF6B6B" />
          <ThemedText style={styles.deleteButtonText}>Xóa chi tiêu</ThemedText>
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  updateButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#4ECDC4",
    alignItems: "center",
  },
  updateButtonDisabled: {
    opacity: 0.6,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  deleteButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFE6E6",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B6B",
    marginLeft: 8,
  },
  bottomPadding: {
    height: 16,
  },
});
