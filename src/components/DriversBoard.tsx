import DriverStatusToggle from "@/components/buttons/DriverStatusToggle";
import RegisterButton from "@/components/buttons/RegisterButton";
import RegisterDriverModal from "@/components/modals/RegisterModal";
import PanelHeader from "@/components/panel-components/PanelHeader";
import { useToast } from "@/hooks/useToast";
import {
  registerDriver as registerDriverMutation,
  updateDriverAvailability,
} from "@/lib/queries/driver-mutation-queries";
import { getDeliveryDrivers } from "@/lib/queries/get-delivery-drivers-queries";
import { supabase } from "@/lib/supabase/supabase";
import type { Driver } from "@/lib/types/drivertypes";
import { DriversBoardstyles } from "@/styles/Drivers.styles";
import { COLORS } from "@/styles/StyleTokens";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function DriversBoard() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [currentUserID, setCurrentUserID] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const showToast = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const [
          driversData,
          {
            data: { user },
          },
        ] = await Promise.all([getDeliveryDrivers(), supabase.auth.getUser()]);
        setDrivers(driversData);
        setCurrentUserID(user?.id ?? "");
      } catch (error) {
        showToast(getErrorMessage(error, "Failed to load drivers"), "error");
      }
    }
    void loadData();
  }, []);

  async function toggleActive(id: string) {
    const target = drivers.find((d) => d.id === id);
    if (!target) {
      return;
    }
    const nextActive = !target.active;
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d)),
    );

    try {
      await updateDriverAvailability(id, nextActive);
    } catch (error) {
      setDrivers((prev) =>
        prev.map((d) => (d.id === id ? { ...d, active: target.active } : d)),
      );
      showToast(
        getErrorMessage(error, "Failed to update driver availability"),
        "error",
      );
    }
  }

  async function handleRegister(phone: string) {
    try {
      const newDriver = await registerDriverMutation(currentUserID, phone);
      setDrivers((prev) => [...prev, newDriver]);
      setModalOpen(false);
      showToast("Driver Registered", "success");
    } catch (error) {
      showToast(getErrorMessage(error, "Failed to register driver"), "error");
    }
  }

  return (
    <ScrollView contentContainerStyle={DriversBoardstyles.container}>
      <View
        style={[
          DriversBoardstyles.panel,
          { backgroundColor: COLORS.bgPanel, borderColor: COLORS.bgPanelEdge },
        ]}
      >
        <PanelHeader
          title="Drivers"
          itemCount={drivers.length}
          color={COLORS.new}
        />

        <View style={DriversBoardstyles.table}>
          <View
            style={[
              DriversBoardstyles.row,
              DriversBoardstyles.headerRow,
              { borderBottomColor: COLORS.bgPanelEdge },
            ]}
          >
            <Text
              style={[
                DriversBoardstyles.headerCell,
                DriversBoardstyles.nameCol,
                { color: COLORS.inkFaint },
              ]}
            >
              Display Name
            </Text>
            <Text
              style={[
                DriversBoardstyles.headerCell,
                DriversBoardstyles.phoneCol,
                { color: COLORS.inkFaint },
              ]}
            >
              Phone Number
            </Text>
            <Text
              style={[
                DriversBoardstyles.headerCell,
                DriversBoardstyles.activeCol,
                { color: COLORS.inkFaint },
              ]}
            >
              Active
            </Text>
          </View>

          {drivers.map((d) => (
            <View
              key={d.id}
              style={[
                DriversBoardstyles.row,
                { borderBottomColor: COLORS.bgPanelEdge },
              ]}
            >
              <Text
                style={[
                  DriversBoardstyles.cell,
                  DriversBoardstyles.nameCol,
                  DriversBoardstyles.nameText,
                  { color: COLORS.paper },
                ]}
              >
                {d.name}
              </Text>
              <Text
                style={[
                  DriversBoardstyles.cell,
                  DriversBoardstyles.phoneCol,
                  { color: COLORS.inkFaint },
                ]}
              >
                {d.phone}
              </Text>
              <View
                style={[DriversBoardstyles.cell, DriversBoardstyles.activeCol]}
              >
                <DriverStatusToggle
                  active={d.active}
                  onToggle={() => void toggleActive(d.id)}
                />
              </View>
            </View>
          ))}
        </View>

        <RegisterButton onPress={() => setModalOpen(true)} />
      </View>

      {modalOpen && (
        <RegisterDriverModal
          onClose={() => setModalOpen(false)}
          onRegister={handleRegister}
        />
      )}
    </ScrollView>
  );
}
