import { COLORS } from "@/styles/StyleTokens";
import Svg, { Line } from "react-native-svg";

export function DashedDivider({ color = COLORS.inkFaint, thickness = 1.5 }: { color?: string; thickness?: number }) {
  return (
    <Svg height={thickness} width="100%">
      <Line x1="0" y1={thickness / 2} x2="100%" y2={thickness / 2} stroke={color} strokeWidth={thickness} strokeDasharray="4,4" />
    </Svg>
  );
}