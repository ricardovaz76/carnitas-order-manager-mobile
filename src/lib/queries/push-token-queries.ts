import { supabase } from "@/lib/supabase/supabase";

export async function registerPushToken( userId: string, expoPushToken: string, platform: string): Promise<void> {
  const { error } = await supabase
    .from("push_token")
    .upsert(
      { user_id: userId, expo_push_token: expoPushToken, platform, updated_at: new Date().toISOString() },
      { onConflict: "expo_push_token" }
    );

  if (error) {
    console.error("Failed to insert/update push token", error);
    throw new Error("Failed to insert/update push token");
  }
}