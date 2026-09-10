import CopyButton from "@/components/buttons/CopyButton";
import ConfirmModal from "@/components/modals/ConfirmModal";
import TicketPerforation from "@/components/ticket-components/ticket-decor/TicketPerforation";
import type { DeliveryInfo } from "@/lib/types/delivertypes";
import { COLORS } from "@/styles/StyleTokens";
import { CompleteButtonstyles, OrderTypestyles, TicketHeaderstyles, Ticketstyles } from "@/styles/Ticket.styles";
import { CheckCircle2, MapPin, Phone } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface DeliveryQueueCardProps {
  delivery: DeliveryInfo;
  onRequestComplete: () => void;
}

export default function DeliveryQueueCard({ delivery, onRequestComplete }: DeliveryQueueCardProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <View style={Ticketstyles.card}>
      <TicketPerforation />
      <View style={Ticketstyles.body}>
        <View style={TicketHeaderstyles.container}>
          <Text style={TicketHeaderstyles.orderId}>#{delivery.orderId}</Text>
        </View>

        <View style={OrderTypestyles.deliveryInfo}>
          <View style={OrderTypestyles.infoRow}>
            <MapPin size={13} color={COLORS.customerInfoInk} />
            <Text style={OrderTypestyles.infoText}>
              {delivery.address ?? "No address on file"}
            </Text>
            {delivery.address && <CopyButton value={delivery.address} label="address" />}
          </View>

          <View style={OrderTypestyles.infoRow}>
            <Phone size={13} color={COLORS.customerInfoInk} />
            <Text style={[OrderTypestyles.infoText, OrderTypestyles.mono]}>
              {delivery.phone ?? "No phone on file"}
            </Text>
            {delivery.phone && <CopyButton value={delivery.phone} label="phone number" />}
          </View>
        </View>

        {/* TODO: total price goes here once the backend calculates it */}

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