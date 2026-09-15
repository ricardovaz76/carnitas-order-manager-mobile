import type { DeliveryDriversRow, Driver, UserRows } from "@/lib/types";


export interface DeliveryDriverWithUser extends DeliveryDriversRow {
  users: UserRows | null;
}

export function mapDriver(row: DeliveryDriverWithUser): Driver {
  return {
    id: row.id,
    name: row.users?.display_name ?? "Unknown",
    phone: row.phone,
    active: row.availability_status === "active",
  };
}
