import { mapDeliveries } from "@/lib/mappers/mapDeliveries";
import type { DeliveryCustomerInfoRow } from "@/lib/types";
import { describe, expect, it } from "@jest/globals";

function makeRow(overrides: Partial<DeliveryCustomerInfoRow> = {}): DeliveryCustomerInfoRow {
  return {
    id: "delivery-1",
    customer_address: "123 Main St",
    customer_phone: "555-0100",
    order_id: 1,
    ...overrides,
  } as DeliveryCustomerInfoRow;
}

describe("mapDeliveries", () => {
  it("maps a row with both address and phone present", () => {
    const row = makeRow();

    const result = mapDeliveries(row);

    expect(result).toEqual({
      id: "delivery-1",
      address: "123 Main St",
      phone: "555-0100",
      orderId: 1,
    });
  });

  it("falls back to null when customer_address is null", () => {
    const row = makeRow({ customer_address: null });

    const result = mapDeliveries(row);

    expect(result.address).toBeNull();
  });

  it("falls back to null when customer_phone is null", () => {
    const row = makeRow({ customer_phone: null });

    const result = mapDeliveries(row);

    expect(result.phone).toBeNull();
  });

  it("falls back to null when customer_address is undefined", () => {
    const row = makeRow({ customer_address: undefined });

    const result = mapDeliveries(row);

    expect(result.address).toBeNull();
  });

  it("handles both address and phone missing at once", () => {
    const row = makeRow({ customer_address: null, customer_phone: null });

    const result = mapDeliveries(row);

    expect(result.address).toBeNull();
    expect(result.phone).toBeNull();
  });

  it("passes id and orderId through unchanged", () => {
    const row = makeRow({ id: "delivery-42", order_id: 99 });

    const result = mapDeliveries(row);

    expect(result.id).toBe("delivery-42");
    expect(result.orderId).toBe(99);
  });
});