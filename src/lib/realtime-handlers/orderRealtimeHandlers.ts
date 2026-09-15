import { getOrderById } from "@/lib/queries/get-order-queries";
import type { CustomerInfoRow, Order, OrderItemRow, OrderRow } from "@/lib/types";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";

type SetOrders = Dispatch<SetStateAction<Order[]>>;

export function createHandleInsert(setOrders: SetOrders) {
  return async function handleInsert(payload: RealtimePostgresChangesPayload<OrderRow>) {
    if (!("id" in payload.new)) return;
    const newOrder = await getOrderById(payload.new.id);
    if (newOrder) {
      setOrders((prev) => [...prev, newOrder]);
    }
  };
}

export function createHandleUpdate(setOrders: SetOrders) {
  return function handleUpdate(payload: RealtimePostgresChangesPayload<OrderRow>) {
    if (!("id" in payload.new)) return;
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
  };
}

export function createHandleDelete(setOrders: SetOrders) {
  return function handleDelete(payload: RealtimePostgresChangesPayload<OrderRow>) {
    if (!("id" in payload.old)) return;
    const deletedId = payload.old.id;
    setOrders((prev) => prev.filter((order) => order.id !== deletedId));
  };
}

export function createHandleCustomerInfoUpdate(setOrders: SetOrders) {
  return function handleCustomerInfoUpdate(payload: RealtimePostgresChangesPayload<CustomerInfoRow>) {
    if (!("order_id" in payload.new)) return;
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
  };
}

export function createHandleOrderItemInsert(setOrders: SetOrders) {
  return function handleOrderItemInsert(payload: RealtimePostgresChangesPayload<OrderItemRow>) {
    if (!("id" in payload.new)) return;
    const newRow = payload.new;
    const newItemId = String(newRow.id);
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== newRow.order_id) return order;
        if (order.items.some((item) => item.id === newItemId)) return order;

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
  };
}

export function createHandleOrderItemDelete(setOrders: SetOrders) {
  return function handleOrderItemDelete(payload: RealtimePostgresChangesPayload<OrderItemRow>) {
    if (!("id" in payload.old)) return;
    const deletedId = String(payload.old.id);
    setOrders((prev) =>
      prev.map((order) => ({
        ...order,
        items: order.items.filter((item) => item.id !== deletedId),
      })),
    );
  };
}

export function createHandleOrderItemUpdate(setOrders: SetOrders) {
  return function handleOrderItemUpdate(payload: RealtimePostgresChangesPayload<OrderItemRow>) {
    if (!("id" in payload.new)) return;
    const updatedRow = payload.new;
    const updatedId = String(updatedRow.id);
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== updatedRow.order_id) return order;
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
  };
}