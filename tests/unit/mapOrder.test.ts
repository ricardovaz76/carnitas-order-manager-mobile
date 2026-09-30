import { mapOrder, type OrderWithItems } from "@/lib/mappers/mapOrder";
import type { OrderItemRow } from "@/lib/types";
import { describe, expect, it } from "@jest/globals";

function makeItem(overrides: Partial<OrderItemRow> = {}): OrderItemRow {
  return {
    id: "item-1",
    item_name: "Burger",
    quantity: 2,
    toppings: "cheese, lettuce",
    ...overrides,
  } as OrderItemRow;
}

function makeRow(overrides: Partial<OrderWithItems> = {}): OrderWithItems {
  return {
    id: "order-1",
    order_type: "delivery",
    order_status: "new",
    created_at: "2026-01-01T00:00:00.000Z",
    additional_info: "Leave at door",
    order_items: [makeItem()],
    ...overrides,
  } as OrderWithItems;
}

describe("mapOrder", () => {
  it("maps a full row with order_items", () => {
    const row = makeRow();

    const result = mapOrder(row);

    expect(result).toEqual({
      id: "order-1",
      orderType: "delivery",
      status: "new",
      firedAt: new Date("2026-01-01T00:00:00.000Z").getTime(),
      additionalInfo: "Leave at door",
      items: [
        {
          id: "item-1",
          item: "Burger",
          quantity: 2,
          toppings: "cheese, lettuce",
        },
      ],
    });
  });

  it("returns an empty items array when order_items is empty", () => {
    const row = makeRow({ order_items: [] });

    const result = mapOrder(row);

    expect(result.items).toEqual([]);
  });

  it("maps multiple order_items independently, including an item with no toppings", () => {
    const row = makeRow({
      order_items: [
        makeItem({ id: "item-1", item_name: "Burger", quantity: 2, toppings: "cheese, lettuce" }),
        makeItem({ id: "item-2", item_name: "Fries", quantity: 1, toppings: null }),
      ],
    });

    const result = mapOrder(row);

    expect(result.items).toEqual([
      { id: "item-1", item: "Burger", quantity: 2, toppings: "cheese, lettuce" },
      { id: "item-2", item: "Fries", quantity: 1, toppings: null },
    ]);
  });

  it("coerces a string quantity to a number", () => {
    const row = makeRow({
      order_items: [makeItem({ quantity: "3" as unknown as number })],
    });

    const result = mapOrder(row);

    expect(result.items[0].quantity).toBe(3);
    expect(typeof result.items[0].quantity).toBe("number");
  });

  it("converts created_at into a millisecond timestamp for firedAt", () => {
    const row = makeRow({ created_at: "2025-06-15T12:30:00.000Z" });

    const result = mapOrder(row);

    expect(result.firedAt).toBe(new Date("2025-06-15T12:30:00.000Z").getTime());
  });

  it("passes id, orderType, status, and additionalInfo through unchanged", () => {
    const row = makeRow({
      id: 42,
      order_type: "pickup",
      order_status: "ready",
      additional_info: "Call on arrival",
    });

    const result = mapOrder(row);

    expect(result.id).toBe(42);
    expect(result.orderType).toBe("pickup");
    expect(result.status).toBe("ready");
    expect(result.additionalInfo).toBe("Call on arrival");
  });
});