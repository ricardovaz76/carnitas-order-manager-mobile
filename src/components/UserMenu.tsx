import { supabase } from "@/lib/supabase/supabase";
import { COLORS } from "@/styles/StyleTokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface UserMenuProps {
  displayName: string;
}

export default function UserMenu({ displayName }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setOpen(false);
    await supabase.auth.signOut();
    router.replace("/");
  }

  function confirmSignOut() {
    setOpen(false);
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: handleSignOut },
    ]);
  }

  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <Text style={styles.trigger}>{displayName}</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            <Pressable disabled style={styles.menuItem}>
              <Text style={styles.menuItemDisabled}>Language: English</Text>
            </Pressable>
            <Pressable
              onPress={confirmSignOut}
              style={[styles.menuItem, styles.menuItemBorder]}
            >
              <Text style={styles.menuItemDanger}>Sign out</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: { fontSize: 14, fontWeight: "600", color: COLORS.paper },
  backdrop: { flex: 1, backgroundColor: "transparent" },
  menu: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 176,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: COLORS.bgPanel,
    borderWidth: 1,
    borderColor: COLORS.bgPanelEdge,
  },
  menuItem: { paddingHorizontal: 16, paddingVertical: 10 },
  menuItemDisabled: { fontSize: 13, color: COLORS.inkFaint },
  menuItemBorder: { borderTopWidth: 1, borderTopColor: COLORS.bgPanelEdge },
  menuItemDanger: { fontSize: 13, fontWeight: "600", color: COLORS.urgent },
});
