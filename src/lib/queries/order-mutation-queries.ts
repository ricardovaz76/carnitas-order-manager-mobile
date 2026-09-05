import { supabase } from "@/lib/supabase/supabase";
import type { Order, OrderItem } from "@/lib/types/ordertypes";

export async function completeOrder(orderId: number): Promise<boolean> {
  const { data, error } = await supabase
    .from("orders")
    .update({ active_status: "completed" })
    .eq("id", orderId)
    .eq("order_status", "ready")
    .select();

  if (error) {
    console.error(`Failed to complete order ${orderId}:`, error);
    throw new Error("Failed to complete order");
  }

  return data.length > 0;
}

// Deletes order rows that have been cancelled
// This triggers the conversation, messages, order_items, and
// customer_info table to delete any row that is referencing the given order ID
export async function cancelOrder(orderId: number): Promise<void> {
  const { error } = await supabase.from("orders").delete().eq("id", orderId);
  if (error) {
    console.error(`Failed to cancel order ${orderId}:`, error);
    throw new Error("Failed to cancel order");
  }
}

// This function updates the order items table for the current order id if the edit has been confirmed by the user
export async function saveOrderItems(
  orderId: number,
  originalItems: OrderItem[],
  updatedItems: OrderItem[],
): Promise<OrderItem[]> {
  const originalIds = new Set(originalItems.map((item) => item.id));
  const updatedIds = new Set(updatedItems.map((item) => item.id));

  // Grabs the order item ids that have been removed
  const removeIds = originalItems
    .filter((item) => !updatedIds.has(item.id))
    .map((item) => item.id);

  // Grabs existing order items that have had updates
  const existingItems = updatedItems.filter((item) => originalIds.has(item.id));

  // Grabs the new order items
  const newItems = updatedItems.filter((item) => !originalIds.has(item.id));

  // Updates any existing order items that have changes
  if (existingItems.length > 0) {
    const { error: upsertError } = await supabase.from("order_items").upsert(
      existingItems.map((item) => ({
        id: item.id,
        order_id: orderId,
        item_name: item.item,
        quantity: item.quantity,
        toppings: item.toppings,
      })),
    );

    if (upsertError) {
      console.error("Failed to save order items:", upsertError);
      throw new Error("Failed to save order items");
    }
  }

  let insertedItems: OrderItem[] = [];

  // inserts the new order items and fetches those items to grab the new uuid created by supabase
  if (newItems.length > 0) {
    const { data, error: insertError } = await supabase
      .from("order_items")
      .insert(
        newItems.map((item) => ({
          order_id: orderId,
          item_name: item.item,
          quantity: item.quantity,
          toppings: item.toppings,
        })),
      )
      .select();

    if (insertError) {
      console.error("Failed to insert new order items:", insertError);
      throw new Error("Failed to insert order items");
    }

    // save the inserted items for optimistic updates
    insertedItems = (data ?? []).map((row) => ({
      id: String(row.id),
      item: row.item_name,
      quantity: Number(row.quantity),
      toppings: row.toppings,
    }));
  }

  // deletes any removed order items from the database
  if (removeIds.length > 0) {
    const { error: deleteError } = await supabase
      .from("order_items")
      .delete()
      .in("id", removeIds);

    if (deleteError) {
      console.error("Failed to delete removed order items:", deleteError);
      throw new Error("Failed to delete order items");
    }
  }

  // returns the updates order items array for optimistic updating
  return [...existingItems, ...insertedItems];
}

export async function updateOrderStatus(
  orderId: number,
  status: Order["status"],
): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ order_status: status })
    .eq("id", orderId);

  if (error) {
    console.error(`Failed to update order ${orderId} status:`, error);
    throw new Error("Failed to update order status");
  }
}
