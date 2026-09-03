// src/app/index.tsx
import Field from "@/components/login-components/Field";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/login-styles/Login.styles";
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
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Carnitas Order Manager</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.requiredText}>
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

          <View style={styles.divider} />

          <View style={styles.buttonRow}>
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <LogIn size={16} color={COLORS.bgDeep} />
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
