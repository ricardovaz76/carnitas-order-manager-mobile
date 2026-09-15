import StatusButton from "@/components/buttons/StatusButton";
import TicketActionsButtons from "@/components/buttons/TicketActionsButtons";
import ConfirmModal from "@/components/modals/ConfirmModal";
import EditModal from "@/components/modals/EditModal";
import TicketHeader from "@/components/ticket-components/TicketHeader";
import TicketItems from "@/components/ticket-components/TicketItems";
import TicketPerforation from "@/components/ticket-components/ticket-decor/TicketPerforation";
import { useOrders } from "@/hooks/useOrders";
import { useToast } from "@/hooks/useToast";
import {
  cancelOrder as cancelOrderInDb,
  completeOrder as completeOrderInDb,
  saveOrderItems,
  updateOrderStatus,
} from "@/lib/queries/order-mutation-queries";
import type { Order, OrderItem } from "@/lib/types";
import { COLORS } from "@/styles/StyleTokens";
import { Ticketstyles } from "@/styles/Ticket.styles";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { orderStatus, statusColor } from "@/utils/statusUtils";
import { useState } from "react";
import { View } from "react-native";

interface TicketProps {
  order: Order;
}

export default function Ticket({ order }: TicketProps) {
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const customerInfo = {
    address: order.customerAddress ?? null,
    phone: order.customerPhone ?? null,
  };
  const showToast = useToast();
  const { updateOrderFields } = useOrders();

  async function handleAdvanceClick() {
    if (order.status === "new") {
      updateOrderFields(order.id, { status: "in_progress" });
      try {
        await updateOrderStatus(order.id, "in_progress");
      } catch (error) {
        updateOrderFields(order.id, { status: "new" });
        showToast(
          getErrorMessage(error, "Failed to update order status"),
          "error",
        );
      }
    } else if (order.status === "in_progress") {
      updateOrderFields(order.id, { status: "ready" });
      try {
        await updateOrderStatus(order.id, "ready");
      } catch (error) {
        updateOrderFields(order.id, { status: "in_progress" });
        showToast(
          getErrorMessage(error, "Failed to update order status"),
          "error",
        );
      }
    } else {
      setShowCompleteModal(true);
    }
  }

  async function completeOrder() {
    setShowCompleteModal(false);
    try {
      const wasCompleted = await completeOrderInDb(order.id);
      if (!wasCompleted) {
        showToast("Order isn't ready to complete yet", "error");
      }
    } catch (error) {
      showToast(getErrorMessage(error, "Failed to complete order"), "error");
    }
  }

  async function cancelOrder() {
    setShowCancelModal(false);
    try {
      await cancelOrderInDb(order.id);
    } catch (error) {
      showToast(getErrorMessage(error, "Failed to cancel order"), "error");
    }
  }

  async function handleSaveEdit(updatedItems: OrderItem[]) {
    setShowEditModal(false);
    try {
      const savedItems = await saveOrderItems(
        order.id,
        order.items,
        updatedItems,
      );
      updateOrderFields(order.id, { items: savedItems });
      showToast("Order changes successfully saved", "success");
    } catch (error) {
      showToast(getErrorMessage(error, "Failed to save changes"), "error");
    }
  }

  return (
    <View style={Ticketstyles.card}>
      <TicketPerforation />
      <View style={Ticketstyles.body}>
        <TicketHeader
          orderId={order.id}
          orderType={order.orderType}
          firedAt={order.firedAt}
          customerInfo={customerInfo}
          driverId={order.driverId}
        />
        <TicketItems
          orderItems={order.items}
          additionalInfo={order.additionalInfo}
        />
        <StatusButton
          status={orderStatus[order.status]}
          statusColor={statusColor[order.status]}
          onAdvance={handleAdvanceClick}
        />
        <TicketActionsButtons
          onEdit={() => setShowEditModal(true)}
          onCancel={() => setShowCancelModal(true)}
        />
      </View>

      {showCompleteModal && (
        <ConfirmModal
          message="Mark this order complete?"
          confirmLabel="Confirm"
          confirmColor={COLORS.ready}
          onConfirm={completeOrder}
          onCancel={() => setShowCompleteModal(false)}
        />
      )}
      {showCancelModal && (
        <ConfirmModal
          message="Cancel this order?"
          confirmLabel="Cancel order"
          confirmColor={COLORS.urgent}
          onConfirm={cancelOrder}
          onCancel={() => setShowCancelModal(false)}
        />
      )}
      {showEditModal && (
        <EditModal
          orderItems={order.items}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </View>
  );
}
