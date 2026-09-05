import { fieldStyles } from "@/styles/login-styles/Field.styles";
import { COLORS } from "@/styles/StyleTokens";
import type { LucideIcon } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  Icon: LucideIcon;
}

export default function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  Icon,
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={fieldStyles.container}>
      <View style={fieldStyles.labelRow}>
        <Text style={fieldStyles.asterisk}>*</Text>
        <Icon size={12} color={COLORS.inkFaint} />
        <Text style={fieldStyles.label}>{label}</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.inkFaint}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[fieldStyles.input, focused && fieldStyles.inputFocused]}
      />
    </View>
  );
}
