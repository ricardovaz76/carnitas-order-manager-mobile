import { mapDriver } from "@/lib/mappers/mapDrivers";
import { supabase } from "@/lib/supabase/supabase";
import type { Driver } from "@/lib/types/drivertypes";

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