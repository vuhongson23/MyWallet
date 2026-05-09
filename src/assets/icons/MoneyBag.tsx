import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const MoneyBag = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path fill="#F0EFF8" d="M0 20h20V0H0v20Z" />
  </Svg>
);
export default MoneyBag;
