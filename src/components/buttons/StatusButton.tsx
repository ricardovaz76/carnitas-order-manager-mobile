import { StatusButtonstyles } from "@/styles/button-styles/StatusButton.styles";
import { Pressable, Text } from "react-native";

interface TicketStatusButtonProps {
  status: string;
  statusColor: string;
  onAdvance: () => void;
}

export default function TicketStatusButton({
  status,
  statusColor,
  onAdvance,
}: TicketStatusButtonProps) {
  return (
    <Pressable
      onPress={onAdvance}
      style={({ pressed }) => [
        StatusButtonstyles.button,
        { backgroundColor: statusColor },
        pressed && StatusButtonstyles.pressed,
      ]}
    >
      <Text style={StatusButtonstyles.label}>{status}</Text>
    </Pressable>
  );
}
