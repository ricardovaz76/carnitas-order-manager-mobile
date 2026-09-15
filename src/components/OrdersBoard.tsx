import MobileLayout from "@/components/MobileLayout";
import { useAppResume } from "@/hooks/useAppResume";
import { OrdersContext } from "@/hooks/useOrders";
import type {
  CustomerInfoRow,
  OrderItemRow,
  OrderRow,
} from "@/lib/mappers/mapOrder";
import { getActiveOrders, getOrderById } from "@/lib/queries/get-order-queries";
import { supabase } from "@/lib/supabase/supabase";
import type { Order } from "@/lib/types/ordertypes";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
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
    async function handleInsert(
      payload: RealtimePostgresChangesPayload<OrderRow>,
    ) {
      if (!("id" in payload.new)) {
        return;
      }
      const newOrder = await getOrderById(payload.new.id);
      if (newOrder) {
        setOrders((prev) => [...prev, newOrder]);
      }
    }

    function handleUpdate(payload: RealtimePostgresChangesPayload<OrderRow>) {
      if (!("id" in payload.new)) {
        return;
      }
      const updated = payload.new;

      if (updated.active_status !== "active") {
        setOrders((prev) => prev.filter((order) => order.id !== updated.id));
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === updated.id
            ? {
                ...order,
                additionalInfo: updated.additional_info,
                status: updated.order_status,
                orderType: updated.order_type,
              }
            : order,
        ),
      );
    }

    const channel = supabase
      .channel("orders-changes")
      .on<OrderRow>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          void handleInsert(payload);
        },
      )
      .on<OrderRow>(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        handleUpdate,
      )
      .on<OrderRow>(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders" },
        (payload) => {
          if (!("id" in payload.old)) {
            return;
          }
          const deletedId = payload.old.id;
          setOrders((prev) => prev.filter((order) => order.id !== deletedId));
        },
      )
      .on<CustomerInfoRow>(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "customer_info" },
        (payload) => {
          if (!("order_id" in payload.new)) {
            return;
          }
          const updated = payload.new;
          setOrders((prev) =>
            prev.map((order) =>
              order.id === updated.order_id
                ? {
                    ...order,
                    driverId: updated.driver_id,
                    customerAddress: updated.customer_address,
                    customerPhone: updated.customer_phone,
                  }
                : order,
            ),
          );
        },
      )
      .on<OrderItemRow>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "order_items" },
        (payload) => {
          if (!("id" in payload.new)) {
            return;
          }
          const newRow = payload.new;
          const newItemId = String(newRow.id);
          setOrders((prev) =>
            prev.map((order) => {
              if (order.id !== newRow.order_id) {
                return order;
              }
              if (order.items.some((item) => item.id === newItemId)) {
                return order;
              }

              return {
                ...order,
                items: [
                  ...order.items,
                  {
                    id: newItemId,
                    item: newRow.item_name,
                    quantity: Number(newRow.quantity),
                    toppings: newRow.toppings,
                  },
                ],
              };
            }),
          );
        },
      )
      .on<OrderItemRow>(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "order_items" },
        (payload) => {
          if (!("id" in payload.old)) {
            return;
          }
          const deletedId = String(payload.old.id);
          setOrders((prev) =>
            prev.map((order) => ({
              ...order,
              items: order.items.filter((item) => item.id !== deletedId),
            })),
          );
        },
      )
      .on<OrderItemRow>(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "order_items" },
        (payload) => {
          if (!("id" in payload.new)) {
            return;
          }
          const updatedRow = payload.new;
          const updatedId = String(updatedRow.id);
          setOrders((prev) =>
            prev.map((order) => {
              if (order.id !== updatedRow.order_id) {
                return order;
              }
              return {
                ...order,
                items: order.items.map((item) =>
                  item.id === updatedId
                    ? {
                        ...item,
                        item: updatedRow.item_name,
                        quantity: Number(updatedRow.quantity),
                        toppings: updatedRow.toppings,
                      }
                    : item,
                ),
              };
            }),
          );
        },
      )
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
