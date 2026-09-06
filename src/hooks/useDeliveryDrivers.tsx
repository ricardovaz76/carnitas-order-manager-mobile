import type { DriverMenu } from "@/lib/types/drivertypes";
import { createContext, useContext, useEffect, useState } from "react";

interface DeliveryDriversContextValue {
  deliveryDrivers: DriverMenu[];
  setDeliveryDrivers: (drivers: DriverMenu[]) => void;
}

// TODO: this file should only have the use hook, the provider should be its own component
const DeliveryDriversContext =
  createContext<DeliveryDriversContextValue | null>(null);

export function DeliveryDriversProvider({
  initialDrivers,
  children,
}: {
  initialDrivers: DriverMenu[];
  children: React.ReactNode;
}) {
  const [deliveryDrivers, setDeliveryDrivers] =
    useState<DriverMenu[]>(initialDrivers);

  useEffect(() => {
    setDeliveryDrivers(initialDrivers);
  }, []);

  return (
    <DeliveryDriversContext.Provider
      value={{ deliveryDrivers, setDeliveryDrivers }}
    >
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
