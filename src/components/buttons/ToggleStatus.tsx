import { ToggleStatusstyles } from "@/styles/Buttons.styles";
import { COLORS } from "@/styles/StyleTokens";
import { useEffect, useState } from "react";
import { Animated, Pressable } from "react-native";

interface DriverStatusToggleProps {
  active: boolean;
  onToggle: () => void;
}

export default function ToggleStatus({ active, onToggle,}: DriverStatusToggleProps) {
  const [progress] = useState(() => new Animated.Value(active ? 1 : 0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [active, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18],
  });

  return (
    <Pressable 
      onPress={onToggle}
      style={[
        ToggleStatusstyles.track,
        {
          backgroundColor: active ? COLORS.ready : COLORS.bgPanelEdge,
          borderColor: active ? COLORS.ready : COLORS.bgPanelEdge,
        },
      ]}
    >
      <Animated.View
        style={[
          ToggleStatusstyles.thumb,
          { backgroundColor: COLORS.paper, transform: [{ translateX }] },
        ]}
      />
    </Pressable>
  );
}
