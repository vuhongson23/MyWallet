import { useBottomSheet } from "@/src/context/BottomSheetContext";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTransaction } from "../features/transaction/hooks/useTransaction";
import { CategorySelectorGrid } from "./CategorySelectorGrid";
import Card from "./ui/card";

export function GlobalBottomSheet() {
  const { isVisible, closeBottomSheet } = useBottomSheet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [700], []);
  const { form, onSubmit } = useTransaction();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {
    control,
    watch,
    formState: { errors },
  } = form;
  const type = watch("type");
  const date = watch("date");

  const TABS = [
    { key: "expense" as const, label: "Chi tiêu" },
    { key: "income" as const, label: "Thu nhập" },
  ];

  const TAB_COLOR = {
    expense: "#F06A6A",
    income: "#3DD68C",
  };

  React.useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        bottomSheetModalRef?.current?.present();
      }, 100);
    }
  }, [isVisible]);

  const handleDismiss = useCallback(() => {
    closeBottomSheet();
  }, [closeBottomSheet]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <Pressable
        style={[StyleSheet.absoluteFill, { backgroundColor: "transparent" }]}
        onPress={() => bottomSheetModalRef.current?.dismiss()}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={handleDismiss}
      enableDynamicSizing={false}
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={styles.handleIndicator}
      bottomInset={65}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Thêm giao dịch</Text>
        </View>
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <View style={styles.typeTabs}>
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.typeTab,
                    value === tab.key && {
                      backgroundColor: TAB_COLOR[tab.key],
                    },
                  ]}
                  onPress={() => onChange(tab.key)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.typeLabel,
                      value === tab.key
                        ? styles.typeLabelActive
                        : styles.typeLabelInactive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />

        <Card containerStyle={{ marginBottom: 14 }}>
          <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange, onBlur } }) => (
              <View>
                <Text
                  style={{
                    color: "#9896B0",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Nhập số tiền
                </Text>

                <TextInput
                  style={[
                    styles.amountInput,
                    { color: value > 0 ? TAB_COLOR[type] : "#5C5B72" },
                  ]}
                  value={value > 0 ? value.toLocaleString("vi-VN") : ""}
                  onChangeText={(text) => {
                    const clean = text.replace(/[^0-9]/g, "");
                    onChange(clean ? parseInt(clean, 10) : 0);
                  }}
                  onBlur={onBlur}
                  placeholder="0"
                  placeholderTextColor="#5C5B72"
                  keyboardType="numeric"
                  returnKeyType="done"
                  maxLength={15}
                />
              </View>
            )}
          />
        </Card>

        <Controller
          control={control}
          name="categoryId"
          render={({ field: { value, onChange } }) => (
            <CategorySelectorGrid
              selectedCategory={value}
              onSelectCategory={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateLabel}>Ngày giao dịch</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.dateText}>
                  {value ? value.toLocaleDateString("vi-VN") : "Chọn ngày"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS !== "ios") {
                      setShowDatePicker(false);
                    }
                    if (selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
              {Platform.OS === "ios" && showDatePicker && (
                <TouchableOpacity
                  style={styles.dateConfirmButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.dateConfirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.noteContainer}>
              <Text style={styles.noteLabel}>Ghi chú (tùy chọn)</Text>
              <TextInput
                style={styles.noteInput}
                value={value || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Thêm ghi chú về giao dịch này..."
                placeholderTextColor="#5C5B72"
                multiline
                numberOfLines={3}
                maxLength={500}
              />
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={() => {
            onSubmit();
          }}
        >
          <Text style={styles.submitButtonText}>Thêm giao dịch</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#0F0F14",
  },
  handleIndicator: {
    backgroundColor: "#999",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F0F14",
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F0EFF8",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 20,
    color: "#666",
  },
  content: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  demoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },
  actionButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  typeTabs: {
    flexDirection: "row",
    backgroundColor: "#1A1A24",
    borderColor: "#7c6fe042",
    borderWidth: 1,
    borderRadius: 13,
    padding: 3,
    gap: 2,
    marginBottom: 14,
  },
  typeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  typeLabel: { fontSize: 13, fontWeight: "500" },
  typeLabelActive: { color: "#fff" },
  typeLabelInactive: { color: "#9896B0" },
  amountInput: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -1,
    textAlign: "center",
    width: "100%",
    paddingVertical: 4,
  },
  submitButton: {
    backgroundColor: "#7C6FE0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dateInputContainer: {
    marginBottom: 14,
  },
  dateLabel: {
    fontSize: 13,
    color: "#9896B0",
    fontWeight: "500",
    marginBottom: 8,
  },
  dateInput: {
    backgroundColor: "#17171F",
    borderWidth: 1,
    borderColor: "#7c6fe042",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  dateText: {
    color: "#F0EFF8",
    fontSize: 14,
    fontWeight: "500",
  },
  dateConfirmButton: {
    backgroundColor: "#7C6FE0",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateConfirmButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  noteContainer: {
    marginBottom: 14,
  },
  noteLabel: {
    fontSize: 13,
    color: "#9896B0",
    fontWeight: "500",
    marginBottom: 8,
  },
  noteInput: {
    backgroundColor: "#17171F",
    borderWidth: 1,
    borderColor: "#7c6fe042",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#F0EFF8",
    fontSize: 14,
    fontFamily: "monospace",
    minHeight: 80,
    textAlignVertical: "top",
  },
});
