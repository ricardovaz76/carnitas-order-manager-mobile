import { CopyButtonstyles } from "@/styles/button-styles/CopyButton.styles";
import { COLORS } from "@/styles/StyleTokens";
import * as Clipboard from "expo-clipboard";
import { Check, Copy } from "lucide-react-native";
import { useState } from "react";
import { Pressable } from "react-native";

interface CopyButtonProps {
  value: string;
  label: string;
}

export default function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  async function handleCopy() {
    try {
      await Clipboard.setStringAsync(value);
    } catch (error) {
      // clipboard unavailable so do nothing
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Pressable
      onPress={handleCopy}
      accessibilityLabel={`Copy ${label}`}
      hitSlop={8}
      style={({ pressed }) => [CopyButtonstyles.button, pressed && CopyButtonstyles.buttonPressed]}
    >
      {copied ? (
        <Check size={12} color={COLORS.ready}/>
      ) : (
        <Copy size={12} color={COLORS.inkFaint}/>
      )}
    </Pressable>
  );
}