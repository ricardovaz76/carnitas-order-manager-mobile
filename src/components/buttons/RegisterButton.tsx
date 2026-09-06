import { COLORS } from "@/styles/StyleTokens";
import { RegisterButtonstyles } from "@/styles/button-styles/RegisterButton";
import { UserPlus } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface RegisterButtonProps {
  onPress: () => void;
}

export default function RegisterButton({ onPress }: RegisterButtonProps) {
  return (
    <View style={RegisterButtonstyles.wrapper}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          RegisterButtonstyles.button,
          { backgroundColor: COLORS.new, opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <UserPlus size={16} color={COLORS.bgDeep} />
        <Text style={[RegisterButtonstyles.label, { color: COLORS.bgDeep }]}>
          Register
        </Text>
      </Pressable>
    </View>
  );
}
