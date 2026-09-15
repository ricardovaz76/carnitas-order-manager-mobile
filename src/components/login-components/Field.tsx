import { Fieldstyles } from "@/styles/Login.styles";
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
    <View style={Fieldstyles.container}>
      <View style={Fieldstyles.labelRow}>
        <Text style={Fieldstyles.asterisk}>*</Text>
        <Icon size={12} color={COLORS.inkFaint} />
        <Text style={Fieldstyles.label}>{label}</Text>
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
        style={[Fieldstyles.input, focused && Fieldstyles.inputFocused]}
      />
    </View>
  );
}
