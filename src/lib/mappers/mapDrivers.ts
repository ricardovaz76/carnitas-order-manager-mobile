import type { Database } from "@/lib/supabase/database.types";
import type { Driver, DriverMenu } from "@/lib/types/drivertypes";

type DeliveryDriversRow =
  Database["public"]["Tables"]["delivery_drivers"]["Row"];
type UserRows = Database["public"]["Tables"]["users"]["Row"];

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

export function mapDriverMenu(row: DeliveryDriverWithUser): DriverMenu {
  return {
    id: row.id,
    name: row.users?.display_name ?? "Unknown",
    phone: row.phone,
  };
}
