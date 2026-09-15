// src/components/modals/TicketEditModal.tsx
import type { OrderItem } from "@/lib/types/ordertypes";
import { EditModalstyles } from "@/styles/Modal.styles";
import { COLORS } from "@/styles/StyleTokens";
import {
  addBlankItem,
  removeItemById,
  updateItemName,
  updateItemQuantity,
  updateItemToppings,
} from "@/utils/orderItemsUtils";
import { Plus, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface TicketEditModalProps {
  orderItems: OrderItem[];
  onSave: (items: OrderItem[]) => void;
  onCancel: () => void;
}

export default function TicketEditModal({
  orderItems,
  onSave,
  onCancel,
}: TicketEditModalProps) {
  const [draftItems, setDraftItems] = useState<OrderItem[]>(orderItems);

  function updateQuantity(id: string, quantity: number) {
    setDraftItems((prev) => updateItemQuantity(prev, id, quantity));
  }

  function updateName(id: string, name: string) {
    setDraftItems((prev) => updateItemName(prev, id, name));
  }

  function updateToppings(id: string, toppings: string) {
    setDraftItems((prev) => updateItemToppings(prev, id, toppings));
  }

  function addItem() {
    setDraftItems((prev) => addBlankItem(prev));
  }

  function removeItem(id: string) {
    setDraftItems((prev) => removeItemById(prev, id));
  }

  return (
    <View style={EditModalstyles.overlay}>
      <View style={EditModalstyles.box}>
        {draftItems.map((item) => (
          <View key={item.id} style={EditModalstyles.row}>
            <TextInput
              value={String(item.quantity)}
              onChangeText={(text) =>
                updateQuantity(item.id, Number(text) || 0)
              }
              keyboardType="numeric"
              style={EditModalstyles.quantityInput}
            />
            <TextInput
              value={item.item}
              onChangeText={(text) => updateName(item.id, text)}
              style={EditModalstyles.textInput}
            />
            <TextInput
              value={item.toppings ?? ""}
              onChangeText={(text) => updateToppings(item.id, text)}
              style={EditModalstyles.textInput}
            />
            <Pressable
              onPress={() => removeItem(item.id)}
              style={({ pressed }) => pressed && EditModalstyles.pressed}
            >
              <X size={16} color={COLORS.urgent} />
            </Pressable>
          </View>
        ))}

        <Pressable
          onPress={addItem}
          style={({ pressed }) => [
            EditModalstyles.addButton,
            pressed && EditModalstyles.pressed,
          ]}
        >
          <Plus size={16} color={COLORS.paper} />
        </Pressable>

        <View style={EditModalstyles.buttonRow}>
          <Pressable
            onPress={onCancel}
            style={({ pressed }) => [
              EditModalstyles.button,
              { backgroundColor: COLORS.bgPanelEdge },
              pressed && EditModalstyles.pressed,
            ]}
          >
            <Text style={[EditModalstyles.buttonText, { color: "#F0EEE6" }]}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onSave(draftItems)}
            style={({ pressed }) => [
              EditModalstyles.button,
              { backgroundColor: COLORS.ready },
              pressed && EditModalstyles.pressed,
            ]}
          >
            <Text style={[EditModalstyles.buttonText, { color: "#FFFFFF" }]}>
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
