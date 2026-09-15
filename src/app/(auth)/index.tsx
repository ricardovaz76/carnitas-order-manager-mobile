// src/app/index.tsx
import Field from "@/components/login-components/Field";
import { supabase } from "@/lib/supabase/supabase";
import { Loginstyles } from "@/styles/Login.styles";
import { COLORS } from "@/styles/StyleTokens";
import { useRouter } from "expo-router";
import { Lock, LogIn, User } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setInvalidLogin(false);

    const { error } = await supabase.auth.signInWithPassword({
      email: `${username}@employees.carnitas.internal`,
      password,
    });

    if (error) {
      setInvalidLogin(true);
      return;
    }

    router.replace("/");
  }

  return (
    <KeyboardAvoidingView
      style={Loginstyles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={Loginstyles.card}>
        <View style={Loginstyles.header}>
          <Text style={Loginstyles.headerText}>Carnitas Order Manager</Text>
        </View>

        <View style={Loginstyles.form}>
          <Text style={Loginstyles.requiredText}>
            *{" "}
            {invalidLogin
              ? "Invalid Username or Password"
              : "are required fields"}
          </Text>

          <Field
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            Icon={User}
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            Icon={Lock}
          />

          <View style={Loginstyles.divider} />

          <View style={Loginstyles.buttonRow}>
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                Loginstyles.button,
                pressed && Loginstyles.buttonPressed,
              ]}
            >
              <LogIn size={16} color={COLORS.bgDeep} />
              <Text style={Loginstyles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
