import { COLORS } from "@/styles/StyleTokens";
import { Perforationstyles } from "@/styles/ticket-styles/TicketDecor.styles";
import { useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

const CIRCLE_SPACING = 20;
const CIRCLE_RADIUS = 5;

// This is only a decorative component for the top of a ticket. No data should pass through here!!!
export default function TicketPerforation() {
  const [width, setWidth] = useState(0);

  function handleLayout(e: LayoutChangeEvent) {
    setWidth(e.nativeEvent.layout.width);
  }

  const circleCount = Math.ceil(width / CIRCLE_SPACING) + 1;

  return (
    <View style={Perforationstyles.container} onLayout={handleLayout}>
      {width > 0 && (
        <Svg width={width} height={10}>
          <Rect x={0} y={0} width={width} height={10} fill={COLORS.paper} />
          {Array.from({ length: circleCount }).map((_, i) => (
            <Circle
              key={i}
              cx={10 + i * CIRCLE_SPACING}
              cy={0}
              r={CIRCLE_RADIUS}
              fill={COLORS.bgPanel}
            />
          ))}
        </Svg>
      )}
    </View>
  );
}
