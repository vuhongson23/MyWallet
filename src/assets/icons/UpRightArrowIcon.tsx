import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
const UpRightArrowIcon = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#3DD68C"
        d="M4.5 2.5v1h3.295L2 9.295l.705.705L8.5 4.205V7.5h1v-5h-5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default UpRightArrowIcon;
