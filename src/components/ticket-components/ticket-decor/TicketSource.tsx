import { COLORS } from "@/styles/StyleTokens";
import { Sourcestyles } from "@/styles/Ticket.styles";
import { MessageCircle } from "lucide-react-native";
import { Text, View } from "react-native";

export default function TicketSource() {
  return (
    <View style={Sourcestyles.container}>
      <MessageCircle size={12} color={COLORS.inkFaint} />
      <Text style={Sourcestyles.text}>via Messenger</Text>
    </View>
  );
}
