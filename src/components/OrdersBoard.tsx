import MobileLayout from "@/components/MobileLayout";
import { useAppResume } from "@/hooks/useAppResume";
import { OrdersContext } from "@/hooks/useOrders";
import { getActiveOrders } from "@/lib/queries/get-order-queries";
import {
  createHandleCustomerInfoUpdate,
  createHandleDelete,
  createHandleInsert,
  createHandleOrderItemDelete,
  createHandleOrderItemInsert,
  createHandleOrderItemUpdate,
  createHandleUpdate,
} from "@/lib/realtime-handlers/orderRealtimeHandlers";
import { supabase } from "@/lib/supabase/supabase";
import type { CustomerInfoRow, Order, OrderItemRow, OrderRow } from "@/lib/types";
import { useEffect, useState } from "react";

// This function uses a channel from supabase live to create listeners for the following:
// - INSERT for orders table: used to get new orders that have been submitted
// - UPDATE for orders table: used to get updates on order status and additional info text
// - UPDATE on customer_info table: used to get updates on customer_address, customer_phone and driver_id (delivery driver id)
// - INSERT on order_items: used to get new order items inserts from LLM parsing
// - DELETE on order_items: LLM deletes before re-inserting with new items to ensure it doesn't accidently duplicate order_items when reading full chat history along with new message
//  The delete listener is meant to ensure the deleted items are also deleted in the array for the specified order id
export default function OrdersBoard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const resumeSignal = useAppResume();

  // This funtion fetches the initial order
  useEffect(() => {
    async function loadInitialOrders() {
      const initial = await getActiveOrders();
      setOrders(initial);
    }
    loadInitialOrders();
  }, [resumeSignal]);

 useEffect(() => {
    const handleInsert = createHandleInsert(setOrders);
    const handleUpdate = createHandleUpdate(setOrders);
    const handleDelete = createHandleDelete(setOrders);
    const handleCustomerInfoUpdate = createHandleCustomerInfoUpdate(setOrders);
    const handleOrderItemInsert = createHandleOrderItemInsert(setOrders);
    const handleOrderItemDelete = createHandleOrderItemDelete(setOrders);
    const handleOrderItemUpdate = createHandleOrderItemUpdate(setOrders);

    const channel = supabase
      .channel("orders-changes")
      .on<OrderRow>( "postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
          void handleInsert(payload);
        },)
      .on<OrderRow>( "postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, handleUpdate,)
      .on<OrderRow>( "postgres_changes", { event: "DELETE", schema: "public", table: "orders" }, handleDelete,)
      .on<CustomerInfoRow>( "postgres_changes", { event: "UPDATE", schema: "public", table: "customer_info" }, handleCustomerInfoUpdate,)
      .on<OrderItemRow>( "postgres_changes", { event: "INSERT", schema: "public", table: "order_items" }, handleOrderItemInsert,)
      .on<OrderItemRow>( "postgres_changes", { event: "DELETE", schema: "public", table: "order_items" }, handleOrderItemDelete,)
      .on<OrderItemRow>( "postgres_changes", { event: "UPDATE", schema: "public", table: "order_items" }, handleOrderItemUpdate,)
      .subscribe();

    return () => {
      supabase.removeChannel(channel).catch((error) => {
        console.error("Failed to remove channel:", error);
      });
    };
  }, []);

  // Optimistic updates to order status
  function updateOrderFields(orderId: number, updates: Partial<Order>) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order,
      ),
    );
  }

  return (
    <OrdersContext.Provider value={{ updateOrderFields }}>
      <MobileLayout orders={orders} />
    </OrdersContext.Provider>
  );
}
