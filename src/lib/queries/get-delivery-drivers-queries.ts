import { mapDriver } from "@/lib/mappers/mapDrivers";
import { supabase } from "@/lib/supabase/supabase";
import type { Driver } from "@/lib/types";

// This function is meant to fetch all drivers in order to display
// registered drivers in the drivers index
export async function getDeliveryDrivers(): Promise<Driver[]> {
  const { data, error } = await supabase
    .from("delivery_drivers")
    .select("*, users(*)");

  if (error) {
    console.error("Failed to fetch delivery drivers.", error);
    throw new Error("Failed to fetch delivery drivers");
  }

  return (data ?? []).map(mapDriver);
}

// Resolves the delivery driver id for the given user, or null if the user isn't a registered driver
export async function getDriverIdForUser(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("delivery_drivers")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch driver id:", error);
    return null;
  }

  return data?.id ?? null;
}