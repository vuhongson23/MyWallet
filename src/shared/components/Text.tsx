import { Platform, Text as RNText } from "react-native";
import { Fonts } from "../constants/theme";

interface TextProps extends React.ComponentProps<typeof RNText> {
  children?: React.ReactNode;
}

export const Text = (props: TextProps) => {
  const { style, ...rest } = props;

  const defaultFontFamily =
    Platform.OS !== "web" ? "DMSans-Regular" : Fonts.sans;

  return (
    <RNText
      {...rest}
      style={[
        {
          fontFamily: defaultFontFamily,
        },
        style,
      ]}
    />
  );
};

export default Text;
