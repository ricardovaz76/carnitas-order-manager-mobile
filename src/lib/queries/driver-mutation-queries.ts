import { mapDriver } from "@/lib/mappers/mapDrivers";
import { supabase } from "@/lib/supabase/supabase";
import type { Driver } from "@/lib/types";

export async function updateDriverAvailability( driverId: string, active: boolean,): Promise<void> {
  const { error } = await supabase
    .from("delivery_drivers")
    .update({ availability_status: active ? "active" : "inactive" })
    .eq("id", driverId);

  if (error) {
    console.error(`Failed to update driver ${driverId} availability:`, error);
    throw new Error("Failed to update driver availability");
  }
}

export async function registerDriver( userId: string, phone: string, ): Promise<Driver> {
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

export async function assignDriverToOrder( orderId: number, newDriverId: string, ): Promise<void> {
  const { data: existing, error: existingError } = await supabase
    .from("customer_info")
    .select("driver_id")
    .eq("order_id", orderId)
    .single();

  if (existingError) {
    console.error("Failed to grab previous driver data:", existingError);
    throw new Error("Failed to grab previous driver data");
  }

  const previousDriverId = existing?.driver_id;

  const { error } = await supabase
    .from("customer_info")
    .update({ driver_id: newDriverId })
    .eq("order_id", orderId);

  if (error) {
    console.error(`Failed to assign driver to order ${orderId}`, error);
    if (error.code === "23514") {
      throw new Error("Add an address before assigning a driver");
    }
    throw new Error("Failed to assign driver to order");
  }

  // When a delivery gets reassigned to another driver, this change is broadcasted to 
  // "driver_deliveries" channel on src/components/DeliveryBoard.tsx to ensure the Delivery board 
  // removes any deliveries that they are no longer assign to
  if (previousDriverId && previousDriverId !== newDriverId) {
  try {
    await supabase.channel(`driver-${previousDriverId}`).httpSend("delivery_removed", { orderId });
  } catch (broadcastError) {
    console.error("Failed to notify previous driver:", broadcastError);
  }
}
}
