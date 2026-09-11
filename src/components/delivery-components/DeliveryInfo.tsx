import CopyButton from "@/components/buttons/CopyButton";
import { COLORS } from "@/styles/StyleTokens";
import { OrderTypestyles } from "@/styles/Ticket.styles";
import { MapPin, Phone } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface DeliveryInfoProps {
  address: string | null;
  phone: string | null;
  openMap: (address: string | null) => void; 
}

export default function DeliveryInfo({ address, phone, openMap }: DeliveryInfoProps) {
  return (
  <View style={OrderTypestyles.deliveryInfo}>
    <View style={OrderTypestyles.infoRow}>
      <Pressable onPress={() => openMap(address)} style={OrderTypestyles.infoRow}>
        <MapPin size={13} color={COLORS.customerInfoInk} />
        <Text style={OrderTypestyles.DeliveryInfoText}>{address ?? "No address on file"}</Text>
      </Pressable>
      {address && <CopyButton value={address} label="address" />}
    </View>

    <View style={OrderTypestyles.infoRow}>
      <Phone size={13} color={COLORS.customerInfoInk} />
        <Text style={[OrderTypestyles.infoText, OrderTypestyles.mono]}>
          {phone ?? "No phone on file"}
        </Text>
        {phone && <CopyButton value={phone} label="phone number" />}
    </View>
  </View>
  );
}