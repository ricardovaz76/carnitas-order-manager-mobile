import { mapDeliveries } from "@/lib/mappers/mapDeliveries";
import { supabase } from "@/lib/supabase/supabase";
import type { DeliveryInfo } from "@/lib/types/delivertypes";

export async function getMyDeliveries(driverId: string): Promise<DeliveryInfo[]> {
  const { data: deliveryData, error: deliveryError } = await supabase
    .from("customer_info")
    .select("id, customer_address, customer_phone, order_id, orders!inner(active_status)")
    .eq("driver_id", driverId)
    .eq("orders.active_status", "active");

    if (deliveryError) {
      console.error("Failed to fetch customer info:", deliveryError);
      throw new Error("Failed to fetch customer information");
    }
    return (deliveryData ?? []).map(mapDeliveries);
}