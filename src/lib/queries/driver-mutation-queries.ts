import { mapDriver } from "@/lib/mappers/mapDrivers";
import { supabase } from "@/lib/supabase/supabase";
import type { Driver } from "@/lib/types/drivertypes";

export async function updateDriverAvailability(
  driverId: string,
  active: boolean,
): Promise<void> {
  const { error } = await supabase
    .from("delivery_drivers")
    .update({ availability_status: active ? "active" : "inactive" })
    .eq("id", driverId);

  if (error) {
    console.error(`Failed to update driver ${driverId} availability:`, error);
    throw new Error("Failed to update driver availability");
  }

  console.log(`Driver-${driverId} status:`, active);
}

export async function registerDriver(
  userId: string,
  phone: string,
): Promise<Driver> {
  const { data, error } = await supabase
    .from("delivery_drivers")
    .insert({ user_id: userId, phone })
    .select("*, users(*)")
    .single();

  if (error) {
    console.error("Failed to register driver:", error);
    if (error.code === "23505") {
      throw new Error("This account is already a registered delivery driver");
    }
    throw new Error("Failed to register driver");
  }

  return mapDriver(data);
}

export async function assignDriverToOrder(
  orderId: number,
  driverId: string,
): Promise<void> {
  const { error } = await supabase
    .from("customer_info")
    .update({ driver_id: driverId })
    .eq("order_id", orderId);

  if (error) {
    console.error(`Failed to assign driver to order ${orderId}`, error);
    if (error.code === "23514") {
      throw new Error("Add an address before assigning a driver");
    }
    throw new Error("Failed to assign driver to order");
  }
}
