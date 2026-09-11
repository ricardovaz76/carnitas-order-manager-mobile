import { AdditionalInfostyles } from "@/styles/Ticket.styles";
import { Text, View } from "react-native";

interface TicketAdditionalInfoProps {
  info: string;
}

export default function TicketAdditionalInfo({
  info,
}: TicketAdditionalInfoProps) {
  return (
    <View style={AdditionalInfostyles.container}>
      <Text style={AdditionalInfostyles.text}>&quot;{info}&quot;</Text>
    </View>
  );
}
