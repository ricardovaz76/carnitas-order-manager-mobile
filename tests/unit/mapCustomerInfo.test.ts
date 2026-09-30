import { mapCustomerInfo } from "@/lib/mappers/mapCustomerInfo";
import type { CustomerInfoRow } from "@/lib/types";
import { describe, expect, it } from "@jest/globals";

function makeRow(overrides: Partial<CustomerInfoRow> = {}): CustomerInfoRow {
  return {
    id: "customer-info-1",
    customer_address: "123 Main St",
    customer_phone: "555-0100",
    driver_id: "driver-1",
    order_id: 1,
    ...overrides,
  } as CustomerInfoRow;
}

describe("mapCustomerInfo", () => {
  it("maps a row with address, phone, and driver present", () => {
    const row = makeRow();

    const result = mapCustomerInfo(row);

    expect(result).toEqual({
      id: "customer-info-1",
      orderId: 1,
      address: "123 Main St",
      phone: "555-0100",
      driverId: "driver-1",
    });
  });

  it("falls back to null when customer_address is null", () => {
    const row = makeRow({ customer_address: null });

    const result = mapCustomerInfo(row);

    expect(result.address).toBeNull();
  });

  it("falls back to null when customer_phone is null", () => {
    const row = makeRow({ customer_phone: null });

    const result = mapCustomerInfo(row);

    expect(result.phone).toBeNull();
  });

  it("falls back to null when driver_id is null", () => {
    const row = makeRow({ driver_id: null });

    const result = mapCustomerInfo(row);

    expect(result.driverId).toBeNull();
  });

  it("falls back to null when fields are undefined", () => {
    const row = makeRow({ customer_address: undefined, customer_phone: undefined, driver_id: undefined });

    const result = mapCustomerInfo(row);

    expect(result.address).toBeNull();
    expect(result.phone).toBeNull();
    expect(result.driverId).toBeNull();
  });

  it("passes id and orderId through unchanged", () => {
    const row = makeRow({ id: "customer-info-42", order_id: 99 });

    const result = mapCustomerInfo(row);

    expect(result.id).toBe("customer-info-42");
    expect(result.orderId).toBe(99);
  });
});
