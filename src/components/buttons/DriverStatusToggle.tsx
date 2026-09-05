import { COLORS } from "@/styles/StyleTokens";
import { StatusTogglestyles } from "@/styles/button-styles/DriverStatusToggle.styles";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

interface DriverStatusToggleProps {
  active: boolean;
  onToggle: () => void;
}

export default function DriverStatusToggle({
  active,
  onToggle,
}: DriverStatusToggleProps) {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

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
        StatusTogglestyles.track,
        {
          backgroundColor: active ? COLORS.ready : COLORS.bgPanelEdge,
          borderColor: active ? COLORS.ready : COLORS.bgPanelEdge,
        },
      ]}
    >
      <Animated.View
        style={[
          StatusTogglestyles.thumb,
          { backgroundColor: COLORS.paper, transform: [{ translateX }] },
        ]}
      />
    </Pressable>
  );
}
