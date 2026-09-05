import { COLORS } from "@/styles/StyleTokens";
import { ConfirmModalstyles } from "@/styles/modal-styles/ConfirmModal.styles";
import { Pressable, Text, View } from "react-native";

interface TicketConfirmModalProps {
  message: string;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  confirmLabel,
  confirmColor,
  onConfirm,
  onCancel,
}: TicketConfirmModalProps) {
  return (
    <View style={ConfirmModalstyles.overlay}>
      <View style={ConfirmModalstyles.box}>
        <Text style={ConfirmModalstyles.message}>{message}</Text>
        <View style={ConfirmModalstyles.buttonRow}>
          <Pressable
            onPress={onCancel}
            style={({ pressed }) => [
              ConfirmModalstyles.button,
              { backgroundColor: COLORS.bgPanelEdge },
              pressed && ConfirmModalstyles.pressed,
            ]}
          >
            <Text style={ConfirmModalstyles.buttonText}>Go back</Text>
          </Pressable>
          <Pressable
            onPress={onConfirm}
            style={({ pressed }) => [
              ConfirmModalstyles.button,
              { backgroundColor: confirmColor },
              pressed && ConfirmModalstyles.pressed,
            ]}
          >
            <Text style={ConfirmModalstyles.buttonText}>{confirmLabel}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
