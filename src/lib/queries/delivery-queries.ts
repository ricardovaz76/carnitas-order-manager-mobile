import { mapDeliveries } from "@/lib/mappers/mapDeliveries";
import { supabase } from "@/lib/supabase/supabase";
import type { DeliveryInfo } from "@/lib/types/delivertypes";

export async function getMyDeliveries(userId: string): Promise<DeliveryInfo[]> {
  const { data: driverData, error: driverError } = await supabase
    .from("delivery_drivers")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (driverError) {
    console.error("Failed to fetch driver id:", driverError);
    throw new Error("Failed to fetch driver data");
  }

  const { data: deliveryData, error: deliveryError } = await supabase
    .from("customer_info")
    .select("id, customer_address, customer_phone, order_id, orders!inner(active_status)")
    .eq("driver_id", driverData.id)
    .eq("orders.active_status", "active");

    if (deliveryError) {
      console.error("Failed to fetch customer info:", deliveryError);
      throw new Error("Failed to fetch customer information");
    }
    return (deliveryData ?? []).map(mapDeliveries);
}