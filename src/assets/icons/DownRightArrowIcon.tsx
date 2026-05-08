import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
const DownRightArrowIcon = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#F06A6A"
        d="M9.5 4.5h-1v3.295L2.705 2 2 2.705 7.795 8.5H4.5v1h5v-5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default DownRightArrowIcon;
