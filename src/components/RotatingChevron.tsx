import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

interface RotatingChevronProps {
  open: boolean;
  size?: number;
  color?: string;
}

export function RotatingChevron({ open, size = 12, color }: RotatingChevronProps) {
  const [rotateAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [open, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <ChevronDown size={size} color={color} />
    </Animated.View>
  );
}