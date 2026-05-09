import Text from "@/src/shared/components/Text";
import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  isViewMore?: boolean;
  containerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  viewMoreStyle?: TextStyle;
  onViewMore?: () => void;
}

const Card = ({
  children,
  title,
  isViewMore = false,
  containerStyle,
  cardStyle,
  headerStyle,
  titleStyle,
  viewMoreStyle,
  onViewMore,
}: CardProps) => {
  const defaultCardStyle: ViewStyle = {
    borderRadius: 20,
    backgroundColor: "#17171F",
    borderColor: "#7c6fe042",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
  };

  const defaultTitleStyle: TextStyle = {
    color: "#F0EFF8",
    fontSize: 14,
    fontWeight: "700",
  };

  const defaultViewMoreStyle: TextStyle = {
    color: "#A594F7",
    fontSize: 12,
  };

  return (
    <View style={containerStyle}>
      {title && (
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            },
            headerStyle,
          ]}
        >
          <Text style={[defaultTitleStyle, titleStyle]}>{title}</Text>
          {isViewMore && (
            <Text
              style={[defaultViewMoreStyle, viewMoreStyle]}
              onPress={onViewMore}
            >
              Xem tất cả
            </Text>
          )}
        </View>
      )}
      <View style={[defaultCardStyle, cardStyle]}>{children}</View>
    </View>
  );
};

export default Card;
