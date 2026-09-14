import { TicketActionsButtonsstyles } from "@/styles/Buttons.styles";
import { COLORS } from "@/styles/StyleTokens";
import { Pressable, Text, View } from "react-native";

interface TicketActionsProps {
  onEdit: () => void;
  onCancel: () => void;
}

export default function TicketActions({
  onEdit,
  onCancel,
}: TicketActionsProps) {
  return (
    <View style={TicketActionsButtonsstyles.row}>
      <Pressable
        onPress={onEdit}
        style={({ pressed }) => [
          TicketActionsButtonsstyles.button,
          { backgroundColor: COLORS.bgDeep },
          pressed && TicketActionsButtonsstyles.pressed,
        ]}
      >
        <Text
          style={[TicketActionsButtonsstyles.label, { color: COLORS.paper }]}
        >
          Edit
        </Text>
      </Pressable>
      <Pressable
        onPress={onCancel}
        style={({ pressed }) => [
          TicketActionsButtonsstyles.button,
          { backgroundColor: COLORS.urgent },
          pressed && TicketActionsButtonsstyles.pressed,
        ]}
      >
        <Text
          style={[TicketActionsButtonsstyles.label, { color: COLORS.paper }]}
        >
          Cancel
        </Text>
      </Pressable>
    </View>
  );
}
