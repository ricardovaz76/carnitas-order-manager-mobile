import type { OrderItem } from "@/lib/types";

export function updateItemQuantity(
  items: OrderItem[],
  id: string,
  quantity: number,
): OrderItem[] {
  return items.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export function updateItemName(
  items: OrderItem[],
  id: string,
  name: string,
): OrderItem[] {
  return items.map((item) => (item.id === id ? { ...item, item: name } : item));
}

// The id is generating a random string just to keep each new item unique when editing.
// Supabase will provide the actually UUID when edit has been confirmed
export function addBlankItem(items: OrderItem[]): OrderItem[] {
  return [
    ...items,
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      item: "",
      quantity: 1,
      toppings: null,
    },
  ];
}

export function removeItemById(items: OrderItem[], id: string): OrderItem[] {
  return items.filter((item) => item.id !== id);
}

export function updateItemToppings(
  items: OrderItem[],
  id: string,
  toppings: string,
): OrderItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, toppings: toppings || null } : item,
  );
}
