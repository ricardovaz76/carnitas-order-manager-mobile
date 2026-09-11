import DeliveryInfo from "@/components/delivery-components/DeliveryInfo";
import ConfirmModal from "@/components/modals/ConfirmModal";
import TicketPerforation from "@/components/ticket-components/ticket-decor/TicketPerforation";
import type { Delivery } from "@/lib/types/delivertypes";
import { DeliveryHeaderstyles } from "@/styles/Delivery.styles";
import { COLORS } from "@/styles/StyleTokens";
import { CompleteButtonstyles, TicketHeaderstyles, Ticketstyles } from "@/styles/Ticket.styles";
import { CheckCircle2 } from "lucide-react-native";
import { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";

interface DeliveryQueueCardProps {
  delivery: Delivery;
  onRequestComplete: () => void;
}

export default function DeliveryQueueCard({ delivery, onRequestComplete }: DeliveryQueueCardProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  function openInMaps(address: string | null) {
    if (!address) {
      return;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  }

  return (
    <View style={Ticketstyles.card}>
      <TicketPerforation />
      <View style={Ticketstyles.body}>
    
        <View style={DeliveryHeaderstyles.wrapper}>
          <View style={DeliveryHeaderstyles.row}>
            <Text style={TicketHeaderstyles.orderId}>#{delivery.orderId}</Text>
          </View>
          <DeliveryInfo address={delivery.address} phone={delivery.phone} openMap={openInMaps}/>
          {/* TODO: total price goes here once the backend calculates it */}
        </View>

        <Pressable
          onPress={() => setOpenModal(true)}
          style={({ pressed }) => [CompleteButtonstyles.button, pressed && { opacity: 0.9 }]}
        >
          <CheckCircle2 size={16} color={COLORS.bgDeep} />
          <Text style={CompleteButtonstyles.text}>Mark Delivered</Text>
        </Pressable>
      </View>
      {openModal && (<ConfirmModal message="Confirm Delivery?" confirmLabel="Mark Delivered" confirmColor={COLORS.ready} onConfirm={onRequestComplete} onCancel={() => setOpenModal(false)}/> )}
    </View>
  );
}