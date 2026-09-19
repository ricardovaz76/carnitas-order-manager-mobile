import { groupOrdersByStatus, STATUS_PANELS } from "@/lib/mappers/grouporders";
import type { Order } from "@/lib/types";
import { describe, expect, it } from "@jest/globals";

function makeOrder(id: string, status: string): Order {
  return { id, status } as unknown as Order;
}

describe("groupOrdersByStatus", () => {
  it("buckets orders by status into new / inProgress / ready", () => {
    const orders = [
      makeOrder("1", "new"),
      makeOrder("2", "in_progress"),
      makeOrder("3", "ready"),
    ];

    const result = groupOrdersByStatus(orders);

    expect(result.new).toEqual([orders[0]]);
    expect(result.inProgress).toEqual([orders[1]]);
    expect(result.ready).toEqual([orders[2]]);
  });

  it("returns empty arrays for all three groups when given no orders", () => {
    const result = groupOrdersByStatus([]);

    expect(result).toEqual({ new: [], inProgress: [], ready: [] });
  });

  it("puts every order in the same bucket when they all share a status", () => {
    const orders = [
      makeOrder("1", "ready"),
      makeOrder("2", "ready"),
      makeOrder("3", "ready"),
    ];

    const result = groupOrdersByStatus(orders);

    expect(result.ready).toHaveLength(3);
    expect(result.new).toHaveLength(0);
    expect(result.inProgress).toHaveLength(0);
  });

  it("drops orders whose status doesn't match any of the three buckets", () => {
    const orders = [
      makeOrder("1", "new"),
      makeOrder("2", "completed"),
      makeOrder("3", "cancelled"),
    ];

    const result = groupOrdersByStatus(orders);

    expect(result.new).toEqual([orders[0]]);
    expect(result.inProgress).toEqual([]);
    expect(result.ready).toEqual([]);
  });

  it("preserves the original order of orders within each bucket", () => {
    const orders = [
      makeOrder("1", "new"),
      makeOrder("2", "new"),
      makeOrder("3", "new"),
    ];

    const result = groupOrdersByStatus(orders);

    expect(result.new.map((o) => o.id)).toEqual(["1", "2", "3"]);
  });

  it("handles a mixed batch with multiple orders per status", () => {
    const orders = [
      makeOrder("1", "new"),
      makeOrder("2", "in_progress"),
      makeOrder("3", "new"),
      makeOrder("4", "ready"),
      makeOrder("5", "in_progress"),
    ];

    const result = groupOrdersByStatus(orders);

    expect(result.new.map((o) => o.id)).toEqual(["1", "3"]);
    expect(result.inProgress.map((o) => o.id)).toEqual(["2", "5"]);
    expect(result.ready.map((o) => o.id)).toEqual(["4"]);
  });
});

describe("STATUS_PANELS", () => {
  it("has an entry for each of the three grouped statuses with a tab title and full title", () => {
    expect(STATUS_PANELS.new).toMatchObject({ tabTitle: "New", title: "New Order" });
    expect(STATUS_PANELS.inProgress).toMatchObject({ tabTitle: "In", title: "In The Kitchen" });
    expect(STATUS_PANELS.ready).toMatchObject({ tabTitle: "Ready", title: "Ready to Go" });
  });

  it("gives every panel a non-empty color", () => {
    for (const key of Object.keys(STATUS_PANELS) as Array<keyof typeof STATUS_PANELS>) {
      expect(STATUS_PANELS[key].color).toBeTruthy();
    }
  });
});