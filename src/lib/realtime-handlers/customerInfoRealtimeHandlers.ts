import { mapCustomerInfo } from "@/lib/mappers/mapCustomerInfo";
import type { CustomerInfo, CustomerInfoRow } from "@/lib/types";
import type {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";

type SetCustomerInfo = Dispatch<SetStateAction<CustomerInfo[]>>;

// Replaces the row with a matching id, or appends it if it isn't in the list yet
function upsert(prev: CustomerInfo[], next: CustomerInfo): CustomerInfo[] {
  const exists = prev.some((info) => info.id === next.id);
  return exists
    ? prev.map((info) => (info.id === next.id ? next : info))
    : [...prev, next];
}

export function createHandleInsert(setCustomerInfo: SetCustomerInfo) {
  return function handleInsert(payload: RealtimePostgresInsertPayload<CustomerInfoRow>) {
    const next = mapCustomerInfo(payload.new);
    setCustomerInfo((prev) => upsert(prev, next));
  };
}

// Covers address, phone, and driver assignment changes
export function createHandleUpdate(setCustomerInfo: SetCustomerInfo) {
  return function handleUpdate(payload: RealtimePostgresUpdatePayload<CustomerInfoRow>) {
    const next = mapCustomerInfo(payload.new);
    setCustomerInfo((prev) => upsert(prev, next));
  };
}

// Rows are deleted when their order is completed or cancelled.
// DELETE payloads only include the primary key, so rows are removed by id
export function createHandleDelete(setCustomerInfo: SetCustomerInfo) {
  return function handleDelete(payload: RealtimePostgresDeletePayload<CustomerInfoRow>) {
    if (!("id" in payload.old)) return;
    const deletedId = payload.old.id;
    setCustomerInfo((prev) => prev.filter((info) => info.id !== deletedId));
  };
}
