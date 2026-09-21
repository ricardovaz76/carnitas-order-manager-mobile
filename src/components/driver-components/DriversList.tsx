import { useDeliveryDrivers } from "@/hooks/useDeliveryDrivers";
import { DriversListstyles } from "@/styles/Drivers.styles";
import { COLORS } from "@/styles/StyleTokens";
import { Check } from "lucide-react-native";
import { type Dispatch, type SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";

interface DriversListProps {
  assignedDriverId: string | null;
  onAssign: (driverId: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DriversList({ assignedDriverId, onAssign, setOpen, }: DriversListProps) {
  const { deliveryDrivers } = useDeliveryDrivers();
  const activeDrivers = deliveryDrivers.filter((d) => d.active);

  function handleAssignDriver(id: string) {
    onAssign(id);
    setOpen(false);
  }

  return (
    <View style={[ DriversListstyles.menu, { backgroundColor: COLORS.bgPanel, borderColor: COLORS.bgPanelEdge }, ]}>
      <Text style={[DriversListstyles.header, { color: COLORS.inkFaint }]}> Assign driver </Text>
      <View style={[DriversListstyles.divider, { borderColor: COLORS.bgPanelEdge }]}/>

      {activeDrivers.length === 0 && (
        <Text style={[DriversListstyles.empty, { color: COLORS.inkFaint }]}>No active drivers</Text>
      )}

      {activeDrivers.map((d) => {
        const isSelected = d.id === assignedDriverId;
        return (
          <Pressable key={d.id} onPress={() => handleAssignDriver(d.id)} style={[ DriversListstyles.row, { backgroundColor: isSelected ? COLORS.bgPanelEdge : "transparent", }, ]}>
            <View style={DriversListstyles.rowLeft}>
              <View style={[ DriversListstyles.dot, { backgroundColor: COLORS.ready }, ]}/>

              <View style={DriversListstyles.rowText}>
                <Text style={[DriversListstyles.name, { color: COLORS.paper }]} numberOfLines={1}> {d.name} </Text>
              </View>
              
            </View>
            {isSelected && <Check size={14} color={COLORS.ready} />}
          </Pressable>
        );
      })}
    </View>
  );
}
