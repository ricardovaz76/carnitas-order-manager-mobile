import { mapCustomerInfo } from "@/lib/mappers/mapCustomerInfo";
import { supabase } from "@/lib/supabase/supabase";
import type { CustomerInfo } from "@/lib/types";

// Fetches customer info for every delivery order. This is the single source of
// customer info for both the orders board and the delivery board.
// customer_info rows only exist for active orders, they are deleted by a trigger
// when their order is completed or deleted (cancelled)
export async function getDeliveryCustomerInfo(): Promise<CustomerInfo[]> {
  const { data, error } = await supabase
    .from("customer_info")
    .select("id, customer_address, customer_phone, driver_id, order_id, orders!inner(order_type)")
    .eq("orders.order_type", "delivery");

  if (error) {
    console.error("Failed to fetch customer info:", error);
    throw new Error("Failed to fetch customer information");
  }

  return (data ?? []).map(mapCustomerInfo);
}
