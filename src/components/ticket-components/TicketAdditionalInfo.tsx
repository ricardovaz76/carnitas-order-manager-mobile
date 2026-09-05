import { AdditionalInfostyles } from "@/styles/ticket-styles/TicketAdditionalInfo.styles";
import { Text, View } from "react-native";

interface TicketAdditionalInfoProps {
  info: string;
}

export default function TicketAdditionalInfo({
  info,
}: TicketAdditionalInfoProps) {
  return (
    <View style={AdditionalInfostyles.container}>
      <Text style={AdditionalInfostyles.text}>"{info}"</Text>
    </View>
  );
}
