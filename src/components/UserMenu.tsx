import ToggleStatus from "@/components/buttons/ToggleStatus";
import { useToast } from "@/hooks/useToast";
import { getNotificationPreference, updateNotificationPreference } from "@/lib/queries/notification-query";
import { supabase } from "@/lib/supabase/supabase";
import { COLORS } from "@/styles/StyleTokens";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface UserMenuProps {
  displayName: string;
}

export default function UserMenu({ displayName }: UserMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const router = useRouter();
  const showToast = useToast();

  useEffect(() => {
    async function loadPreferences() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      try {
        const enabled = await getNotificationPreference(user.id);
        setNotificationsEnabled(enabled);
      } catch (error) {
        showToast(getErrorMessage(error, "Failed to load notification preference"), "error");
      }
    }

    void loadPreferences();
  }, []);

  async function toggleNotifications() {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return;
    }

    try {
      await updateNotificationPreference(user.id, next);
    } catch (error) {
      setNotificationsEnabled(!next);
      showToast(getErrorMessage(error, "Failed to update notification preference"), "error");
    }
  }

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

            <View style={[styles.menuItem, styles.menuItemRow]}>
              <Text style={styles.menuItemLabel}>Order Alerts</Text>
              <ToggleStatus active={notificationsEnabled} onToggle={toggleNotifications}/>
            </View>

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
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.bgPanelEdge,
  },
  menuItemLabel: { fontSize: 12, color: COLORS.paper, fontWeight: 700 },
  menuItemDisabled: { fontSize: 12, color: COLORS.inkFaint, fontWeight: 700 },
  menuItemBorder: { borderTopWidth: 1, borderTopColor: COLORS.bgPanelEdge },
  menuItemDanger: { fontSize: 13, fontWeight: 700, color: COLORS.urgent },
});
