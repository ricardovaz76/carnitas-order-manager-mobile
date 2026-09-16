import type { Driver } from "@/lib/types";
import { createContext, useContext, useState } from "react";

interface DeliveryDriversContextValue {
  deliveryDrivers: Driver[];
  setDeliveryDrivers: (drivers: Driver[]) => void;
}

// TODO: this file should only have the use hook, the provider should be its own component
const DeliveryDriversContext = createContext<DeliveryDriversContextValue | null>(null);

export function DeliveryDriversProvider({ initialDrivers, children, }: { initialDrivers: Driver[]; children: React.ReactNode; }) {
  const [deliveryDrivers, setDeliveryDrivers] = useState<Driver[]>(initialDrivers);
  const [prevInitialDrivers, setPrevInitialDrivers] = useState<Driver[]>(initialDrivers);

  if (initialDrivers !== prevInitialDrivers) {
    setPrevInitialDrivers(initialDrivers);
    setDeliveryDrivers(initialDrivers);
  }

  return (
    <DeliveryDriversContext.Provider value={{ deliveryDrivers, setDeliveryDrivers }}>
      {children}
    </DeliveryDriversContext.Provider>
  );
}

export function useDeliveryDrivers() {
  const context = useContext(DeliveryDriversContext);
  if (!context) {
    throw new Error(
      "useDeliveryDrivers must be used within a DeliveryDriversProvider",
    );
  }
  return context;
}
