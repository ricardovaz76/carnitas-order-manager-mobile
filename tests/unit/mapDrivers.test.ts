import { mapDriver, type DeliveryDriverWithUser } from "@/lib/mappers/mapDrivers";
import { describe, expect, it } from "@jest/globals";

function makeRow(overrides: Partial<DeliveryDriverWithUser> = {}): DeliveryDriverWithUser {
  return {
    id: "driver-1",
    availability_status: "active",
    users: {
      id: "user-1",
      display_name: "Jane Doe",
      new_order_notifications_enabled: true,
    },
    ...overrides,
  } as DeliveryDriverWithUser;
}

describe("mapDriver", () => {
  it("maps a row with a linked user", () => {
    const row = makeRow();

    const result = mapDriver(row);

    expect(result).toEqual({
      id: "driver-1",
      name: "Jane Doe",
      active: true,
    });
  });

  it("falls back to 'Unknown' when users is null", () => {
    const row = makeRow({ users: null });

    const result = mapDriver(row);

    expect(result.name).toBe("Unknown");
  });

  it("sets active to true when availability_status is 'active'", () => {
    const row = makeRow({ availability_status: "active" });

    const result = mapDriver(row);

    expect(result.active).toBe(true);
  });

  it("sets active to false when availability_status is 'inactive'", () => {
    const row = makeRow({ availability_status: "inactive" });

    const result = mapDriver(row);

    expect(result.active).toBe(false);
  });

  it("passes id through unchanged", () => {
    const row = makeRow({ id: "driver-42" });

    const result = mapDriver(row);

    expect(result.id).toBe("driver-42");
  });
});