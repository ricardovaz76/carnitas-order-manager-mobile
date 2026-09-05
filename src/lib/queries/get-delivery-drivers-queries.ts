import { mapDriver, mapDriverMenu } from "@/lib/mappers/mapDrivers";
import { supabase } from "@/lib/supabase/supabase";
import type { Driver, DriverMenu } from "@/lib/types/drivertypes";

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

export async function getActiveDrivers(): Promise<DriverMenu[]> {
  const { data, error } = await supabase
    .from("delivery_drivers")
    .select("*, users(*)")
    .eq("availability_status", "active");

  if (error) {
    console.error("Failed to fetch delivery drivers.", error);
    throw new Error("Failed to fetch delivery drivers.");
  }

  return (data ?? []).map(mapDriverMenu);
}
