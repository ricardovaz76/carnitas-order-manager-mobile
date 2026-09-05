import { RegisterModalstyles } from "@/styles/modal-styles/RegisterModal.styles";
import { COLORS } from "@/styles/StyleTokens";
import { UserPlus, X } from "lucide-react-native";
import { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";

interface RegisterDriverModalProps {
  onClose: () => void;
  onRegister: (phone: string) => void;
}

export default function RegisterDriverModal({
  onClose,
  onRegister,
}: RegisterDriverModalProps) {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  function handlePhoneChange(text: string) {
    setPhone(text);
    setPhoneError(null);
  }

  function handleSubmit() {
    const trimmed = phone.trim();
    if (!/\d{10}$/.test(trimmed)) {
      setPhoneError("Enter a 10-digit phone number, numbers only");
      return;
    }

    void onRegister(trimmed);
  }

  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <Pressable style={RegisterModalstyles.backdrop} onPress={onClose}>
        <Pressable style={RegisterModalstyles.cardWrapper} onPress={() => {}}>
          <View
            style={[
              RegisterModalstyles.card,
              { backgroundColor: COLORS.paper },
            ]}
          >
            <View style={RegisterModalstyles.header}>
              <Text style={[RegisterModalstyles.title, { color: COLORS.ink }]}>
                Register Driver
              </Text>
              <Pressable onPress={onClose} hitSlop={8}>
                <X size={16} color={COLORS.inkFaint} />
              </Pressable>
            </View>

            <Text
              style={[RegisterModalstyles.label, { color: COLORS.inkFaint }]}
            >
              Phone Number:
            </Text>
            <TextInput
              autoFocus
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="5551234567"
              placeholderTextColor={COLORS.inkFaint}
              keyboardType="phone-pad"
              style={[
                RegisterModalstyles.input,
                {
                  backgroundColor: COLORS.paper,
                  borderColor: COLORS.paperEdge,
                  color: COLORS.ink,
                },
              ]}
            />

            {phoneError && (
              <Text
                style={[RegisterModalstyles.error, { color: COLORS.urgent }]}
              >
                {phoneError}
              </Text>
            )}

            <View
              style={[
                RegisterModalstyles.divider,
                { borderColor: COLORS.paperEdge },
              ]}
            />

            <View style={RegisterModalstyles.actions}>
              <Pressable onPress={onClose}>
                <Text
                  style={[
                    RegisterModalstyles.cancelText,
                    { color: COLORS.inkFaint },
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSubmit}
                style={[
                  RegisterModalstyles.submitButton,
                  { backgroundColor: COLORS.new },
                ]}
              >
                <UserPlus size={16} color={COLORS.bgDeep} />
                <Text
                  style={[
                    RegisterModalstyles.submitText,
                    { color: COLORS.bgDeep },
                  ]}
                >
                  Register
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
