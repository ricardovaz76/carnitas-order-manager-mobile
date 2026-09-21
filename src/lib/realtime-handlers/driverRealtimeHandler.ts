import type { DeliveryDriversRow, Driver } from "@/lib/types";
import type { RealtimePostgresInsertPayload, RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";

export function createHandleInsert(setDrivers: Dispatch<SetStateAction<Driver[]>>) {
  return function handleInsert(payload: RealtimePostgresInsertPayload<DeliveryDriversRow>) {
    const row = payload.new;
    setDrivers((prev) => [
      ...prev,
      {
        id: row.id,
        name: "Unknown",
        active: row.availability_status === "active",
      },
    ]);
  };
}

export function createHandleUpdate(setDrivers: Dispatch<SetStateAction<Driver[]>>) {
  return function handleUpdate(payload: RealtimePostgresUpdatePayload<DeliveryDriversRow>) {
    const row = payload.new;
    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === row.id
          ? { ...driver, active: row.availability_status === "active" }
          : driver,
      ),
    );
  };
}