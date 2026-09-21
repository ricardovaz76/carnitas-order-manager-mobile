import RegisterButton from "@/components/buttons/RegisterButton";
import ToggleStatus from "@/components/buttons/ToggleStatus";
import PanelHeader from "@/components/panel-components/PanelHeader";
import { useDeliveryDrivers } from "@/hooks/useDeliveryDrivers";
import { useToast } from "@/hooks/useToast";
import {
  registerDriver as registerDriverMutation,
  updateDriverAvailability,
} from "@/lib/queries/driver-mutation-queries";
import { supabase } from "@/lib/supabase/supabase";
import { DriversBoardstyles } from "@/styles/Drivers.styles";
import { COLORS } from "@/styles/StyleTokens";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ConfirmModal from "./modals/ConfirmModal";

export default function DriversBoard() {
  const { deliveryDrivers, setDeliveryDrivers } = useDeliveryDrivers();
  const [currentUserID, setCurrentUserID] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const showToast = useToast();

  useEffect(() => {
    async function loadCurrentUser() {
      const { data: { user }, } = await supabase.auth.getUser();
      if (!user) {
        return;
      }
      setCurrentUserID(user?.id ?? "");
    }

    void loadCurrentUser();
  }, []);

  // This function updates the active status for the driver in supabase
  // and ensures the inactive driver is not being shown in the assign drivers list
  // when trying to assign a driver an order for delivery
  async function toggleActive(id: string) {
    const target = deliveryDrivers.find((d) => d.id === id);
    if (!target) {
      return;
    }
    const nextActive = !target.active;
    setDeliveryDrivers(deliveryDrivers.map((d) => (d.id === id ? { ...d, active: nextActive } : d)));

    try {
      await updateDriverAvailability(id, nextActive);
    } catch (error) {
      setDeliveryDrivers(deliveryDrivers.map((d) => (d.id === id ? { ...d, active: target.active } : d)));
      showToast( getErrorMessage(error, "Failed to update driver availability"),"error",);
    }
  }

  // This function registers the current user with the given phone number
  // Prevents the user from registering a second time
  async function handleRegister() {
    try {
      const newDriver = await registerDriverMutation(currentUserID);
      setDeliveryDrivers([...deliveryDrivers, newDriver]);
      setModalOpen(false);
      showToast("Driver Registered", "success");
    } catch (error) {
      showToast(getErrorMessage(error, "Failed to register driver"), "error");
    }
  }

  return (
    <ScrollView contentContainerStyle={DriversBoardstyles.container}>
      <View style={[DriversBoardstyles.panel, { backgroundColor: COLORS.bgPanel, borderColor: COLORS.bgPanelEdge }]}>
        <PanelHeader title="Drivers" itemCount={deliveryDrivers.length} color={COLORS.new} />

        <View style={DriversBoardstyles.table}>
          <View style={[DriversBoardstyles.row, DriversBoardstyles.headerRow, { borderBottomColor: COLORS.bgPanelEdge }]}>
            <Text style={[DriversBoardstyles.headerCell, DriversBoardstyles.nameCol, { color: COLORS.inkFaint }]}>Display Name</Text>
            <Text style={[DriversBoardstyles.headerCell, DriversBoardstyles.activeCol, { color: COLORS.inkFaint }]}>Active</Text>
          </View>

          {deliveryDrivers.map((d) => (
            <View key={d.id} style={[DriversBoardstyles.row, { borderBottomColor: COLORS.bgPanelEdge }]}>
              <Text style={[DriversBoardstyles.cell, DriversBoardstyles.nameCol, DriversBoardstyles.nameText, { color: COLORS.paper }]}>{d.name}</Text>
              <View style={[DriversBoardstyles.cell, DriversBoardstyles.activeCol]}>
                <ToggleStatus active={d.active} onToggle={() => void toggleActive(d.id)} />
              </View>
            </View>
          ))}
        </View>
        
        <RegisterButton onPress={() => setModalOpen(true)} />
      </View>

      {modalOpen && (
        <ConfirmModal message="Register as a Delivery Driver?" confirmLabel="Register" confirmColor={COLORS.new} onConfirm={handleRegister} onCancel={() => setModalOpen(false)}/>
      )}
    </ScrollView>
  );
}
