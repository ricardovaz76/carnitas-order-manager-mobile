import DriversList from "@/components/driver-components/DriversList";
import { useDeliveryDrivers } from "@/hooks/useDeliveryDrivers";
import { DriversAssignMenustyles } from "@/styles/Drivers.styles";
import { COLORS } from "@/styles/StyleTokens";
import { ChevronDown, Truck } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";

interface DriverAssignMenuProps {
  assignedDriverId: string | null;
  onAssign: (driverId: string) => void;
}

export default function DriverAssignMenu({ assignedDriverId, onAssign, }: DriverAssignMenuProps) {
  const [open, setOpen] = useState(false);
  const { deliveryDrivers } = useDeliveryDrivers();
  const assignedDriver = deliveryDrivers.find((d) => d.id === assignedDriverId && d.active);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [open])

  const rotate = rotateAnim.interpolate({
    inputRange: [0,1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={DriversAssignMenustyles.container}>
      <Pressable
        onPress={() => setOpen((o) => !o)}
        style={({ pressed }) => [
          DriversAssignMenustyles.button,
          assignedDriver
            ? DriversAssignMenustyles.buttonAssigned
            : DriversAssignMenustyles.buttonUnassigned,
          pressed && DriversAssignMenustyles.buttonPressed,
        ]}
      >
        <Truck size={13} color={assignedDriver ? COLORS.paper : COLORS.cooking} />
        <Text
          style={
            assignedDriver
              ? DriversAssignMenustyles.labelAssigned
              : DriversAssignMenustyles.labelUnassigned
          }
        >
          {assignedDriver ? assignedDriver.name.split(" ")[0] : "Assign driver"}
        </Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ChevronDown size={12} color={assignedDriver ? COLORS.paper : COLORS.cooking}/>
        </Animated.View>
      </Pressable>

      {open && (
        <DriversList assignedDriverId={assignedDriverId} onAssign={onAssign} setOpen={setOpen}/>
      )}
    </View>
  );
}
