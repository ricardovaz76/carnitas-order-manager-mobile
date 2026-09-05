// src/hooks/useToast.tsx
import { COLORS } from "@/styles/StyleTokens";
import { Toaststyles } from "@/styles/toast-styles/Toast.styles";
import { CheckCircle2, X, XCircle } from "lucide-react-native";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastVariant = "success" | "error";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const insets = useSafeAreaInsets();

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, variant: ToastVariant) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View
        style={[Toaststyles.container, { top: insets.top + 16 }]}
        pointerEvents="box-none"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const isSuccess = toast.variant === "success";
  const accent = isSuccess ? COLORS.ready : COLORS.urgent;
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  return (
    <Animated.View
      style={[
        Toaststyles.card,
        {
          borderLeftColor: accent,
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [-8, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Icon size={18} color={accent} style={Toaststyles.icon} />
      <View style={Toaststyles.textContainer}>
        <Text style={[Toaststyles.label, { color: accent }]}>
          {isSuccess ? "Success" : "Failed"}
        </Text>
        <Text style={Toaststyles.message}>{toast.message}</Text>
      </View>
      <Pressable onPress={() => onDismiss(toast.id)}>
        <X size={14} color={COLORS.inkFaint} />
      </Pressable>
    </Animated.View>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.showToast;
}
