import { supabase } from "@/lib/supabase/supabase";

export async function getNotificationPreference(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("users")
    .select("new_order_notifications_enabled")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error("Failed to load notification preference:", error);
    throw error ?? new Error("Failed to load notification preference");
  }

  return data.new_order_notifications_enabled;
}

export async function updateNotificationPreference(userId: string, enable: boolean): Promise<void>  {
  const { error } = await supabase
    .from("users")
    .update({ new_order_notifications_enabled: enable })
    .eq("id", userId);

  if (error) {
    console.error("Failed to update notification preference:", error);
    throw new Error("Failed to update notification preference");
  }
}