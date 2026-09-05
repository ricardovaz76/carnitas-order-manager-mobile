import { mapOrder } from "@/lib/mappers/mapOrder";
import { supabase } from "@/lib/supabase/supabase";
import type { Order } from "@/lib/types/ordertypes";

export async function getActiveOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*), customer_info(*)")
    .eq("active_status", "active");

  if (error) {
    console.error("Failed to fetch active orders:", error);
    throw new Error("Failed to fetch active orders");
  }

  return (data ?? []).map(mapOrder);
}

// This function is meant for supabase live to fetch for new orders without
// having to query the entire table each time a new order is inserted
export async function getOrderById(id: number): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*), customer_info(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Failed to fetch order ${id}:`, error);
    return null;
  }

  return mapOrder(data);
}
