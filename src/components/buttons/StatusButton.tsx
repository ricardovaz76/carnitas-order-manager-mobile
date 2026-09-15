import { StatusButtonstyles } from "@/styles/Buttons.styles";
import { COLORS } from "@/styles/StyleTokens";
import { CheckCircle2 } from "lucide-react-native";
import { Pressable, Text } from "react-native";

interface TicketStatusButtonProps {
  status: string;
  statusLabel: string;
  statusColor: string;
  onAdvance: () => void;
}

export default function TicketStatusButton({ status, statusLabel, statusColor, onAdvance,}: TicketStatusButtonProps) {
  return (
    <Pressable
      onPress={onAdvance}
      style={({ pressed }) => [
        StatusButtonstyles.button,
        { backgroundColor: statusColor },
        pressed && StatusButtonstyles.pressed,
      ]}
    >
      {status === "ready" && (<CheckCircle2 size={16} color={COLORS.paper}/>)}
      <Text style={StatusButtonstyles.label}>{statusLabel}</Text>
    </Pressable>
  );
}
