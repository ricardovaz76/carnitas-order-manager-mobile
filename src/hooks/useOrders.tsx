"use client";
import type { Order } from "@/lib/type";
import { createContext, useContext } from "react";

interface OrdersContextProps {
  updateOrderFields: (orderId: number, updates: Partial<Order>) => void;
}

// This component is meant to allow the Ticket to update the orders array whenever the status changes.
// The orders array starts from OrdersBoard.tsx and is prop drilled down to ticket, so this components allows changes to be made
// back to the master component without needing to prop drill back up

//TODO: context should be in the provider folder
export const OrdersContext = createContext<OrdersContextProps | null>(null);

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersBoard");
  }
  return context;
}
