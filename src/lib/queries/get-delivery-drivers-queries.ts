import { mapDriver, mapDriverMenu } from "@/lib/mappers/mapDrivers";
import { supabase } from "@/lib/supabase/supabase";
import type { Driver, DriverMenu } from "@/lib/types/drivertypes";

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

// This function is meant to fetch drivers with availability_status set to active
// which is meant to show who can be assigned an order for delivery in the DriversList of the Order dashboard index
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
