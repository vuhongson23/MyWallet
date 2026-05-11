import { useBottomSheet } from "@/src/context/BottomSheetContext";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function GlobalBottomSheet() {
  const { isVisible, closeBottomSheet } = useBottomSheet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [300], []);

  React.useEffect(() => {
    console.log("Bottom Sheet isVisible:", isVisible);
    if (isVisible) {
      console.log("Opening bottom sheet");
      setTimeout(() => {
        bottomSheetModalRef.current?.present();
      }, 100);
    }
  }, [isVisible]);

  const handleDismiss = useCallback(() => {
    console.log("Bottom sheet dismissed");
    closeBottomSheet();
  }, [closeBottomSheet]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={handleDismiss}
      enableDynamicSizing={false}
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Thêm giao dịch</Text>
          <TouchableOpacity
            onPress={closeBottomSheet}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.demoText}>hello</Text>
          <Text style={styles.subtitle}>Đây là bottom sheet demo</Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={closeBottomSheet}
        >
          <Text style={styles.actionButtonText}>Đóng</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#fff",
  },
  handleIndicator: {
    backgroundColor: "#999",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
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
});
