import type { CustomerInfo } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useMemo } from "react";

interface CustomerInfoContextValue {
  customerInfo: CustomerInfo[];
  setCustomerInfo: Dispatch<SetStateAction<CustomerInfo[]>>;
  currentDriverId: string | null;
}

// Customer info is fetched and kept live in the dashboard layout. The orders board and
// delivery board both read from here so there is a single source of truth for customer info
export const CustomerInfoContext = createContext<CustomerInfoContextValue | null>(null);

export function useCustomerInfo() {
  const context = useContext(CustomerInfoContext);
  if (!context) {
    throw new Error("useCustomerInfo must be used within the dashboard layout");
  }
  return context;
}

// Customer info rows assigned to the current user's driver id
export function useMyDeliveries() {
  const { customerInfo, setCustomerInfo, currentDriverId } = useCustomerInfo();

  const deliveries = useMemo(
    () => currentDriverId ? customerInfo.filter((info) => info.driverId === currentDriverId) : [],
    [customerInfo, currentDriverId],
  );

  function removeDelivery(orderId: number) {
    setCustomerInfo((prev) => prev.filter((info) => info.orderId !== orderId));
  }

  return { deliveries, removeDelivery };
}
