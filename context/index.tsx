import {
  decreaseCandleQuantityAction,
  increaseCandleQuantityAction,
  removeAllCandlesAction,
} from "@/reducers/candle/action";
import { CandlesReducer, OrderState } from "@/reducers/candle/reducer";
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

type UpdateCandleType = "INCREASE" | "DECREASE" | "REMOVE";

interface CartContextType {
  candles: Candle[];
  updateCandleQuantity: (
    selectedCandle: Candle,
    action: UpdateCandleType
  ) => void;
  clearCart: () => void;
  toggleCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext({} as CartContextType);

export interface Candle {
  id: string;
  image: string;
  name: string;
  price: string;
  quantity: number;
}
export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartState, dispatch] = useReducer(
    CandlesReducer,
    {
      candles: [],
    },
    getStoredCandles
  );

  function updateCandleQuantity(
    selectedCandle: Candle,
    action: UpdateCandleType
  ) {
    switch (action) {
      case "INCREASE":
        dispatch(increaseCandleQuantityAction(selectedCandle));
        break;
      case "DECREASE":
        dispatch(decreaseCandleQuantityAction(selectedCandle));
        break;
      default:
        return "";
    }
  }
  function clearCart() {
    dispatch(removeAllCandlesAction());
  }

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  };

  function getStoredCandles(initialState: OrderState) {
    const storedCandles = localStorage.getItem(
      "@Candle-delivery:order-state-1.0.0"
    );

    if (storedCandles) return JSON.parse(storedCandles);

    return initialState;
  }

  const { candles } = cartState;
  return (
    <CartContext.Provider
      value={{
        candles,
        clearCart,
        updateCandleQuantity,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
