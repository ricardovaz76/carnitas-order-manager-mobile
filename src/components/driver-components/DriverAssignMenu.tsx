import { useDeliveryDrivers } from "@/hooks/useDeliveryDrivers";
import { DriversAssignMenustyles } from "@/styles/Drivers.styles";
import { COLORS } from "@/styles/StyleTokens";
import { ChevronDown, Truck } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DriversList from "./DriversList";

interface DriverAssignMenuProps {
  assignedDriverId: string | null;
  onAssign: (driverId: string) => void;
}

export default function DriverAssignMenu({
  assignedDriverId,
  onAssign,
}: DriverAssignMenuProps) {
  const [open, setOpen] = useState(false);
  const { deliveryDrivers } = useDeliveryDrivers();
  const assignedDriver = deliveryDrivers.find((d) => d.id === assignedDriverId);

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
        <Truck
          size={13}
          color={assignedDriver ? COLORS.paper : COLORS.cooking}
        />
        <Text
          style={
            assignedDriver
              ? DriversAssignMenustyles.labelAssigned
              : DriversAssignMenustyles.labelUnassigned
          }
        >
          {assignedDriver ? assignedDriver.name.split(" ")[0] : "Assign driver"}
        </Text>
        <ChevronDown
          size={12}
          color={assignedDriver ? COLORS.paper : COLORS.cooking}
        />
      </Pressable>

      {open && (
        <DriversList
          assignedDriverId={assignedDriverId}
          onAssign={onAssign}
          setOpen={setOpen}
        />
      )}
    </View>
  );
}
