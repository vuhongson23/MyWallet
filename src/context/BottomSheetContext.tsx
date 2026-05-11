import React, { createContext, useCallback, useState } from "react";

interface BottomSheetContextType {
  isVisible: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  toggleBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export function BottomSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const openBottomSheet = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggleBottomSheet = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        isVisible,
        openBottomSheet,
        closeBottomSheet,
        toggleBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  const context = React.useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within BottomSheetProvider");
  }
  return context;
}
