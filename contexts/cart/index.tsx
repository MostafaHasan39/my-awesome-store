"use client";
import { LineItem, Product } from "@/types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from "react";

const LOCAL_STORAGE_CART_KEY = "cart";

interface State {
  lineItems: LineItem[];
  cartCount: number;
  cartTotal: number;
  removeProduct: (productId: number) => void;
  updateProductQuantity: (product: Product, quantity: number) => void;
}

const initialState = {
  lineItems: [],
  cartCount: 0,
  cartTotal: 0,
  removeProduct: () => {},
  updateProductQuantity: () => {},
};

const stateInit = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    try {
      return cart ? JSON.parse(cart) : initialState;
    } catch (error) {
      console.error(error);
      return initialState;
    }
  }
  return initialState;
};

type Action =
  | {
      type: "REMOVE_PRODUCT";
      payload: {
        productId: number;
      };
    }
  | {
      type: "UPDATE_PRODUCT_QUANTITY";
      payload: {
        product: Product;
        quantity: number;
      };
    };

export const CartContext = createContext<State>(initialState);

const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "REMOVE_PRODUCT": {
      return {
        ...state,
        ...removeProductHandler(state.lineItems, action.payload.productId),
      };
    }
    case "UPDATE_PRODUCT_QUANTITY": {
      return {
        ...state,
        ...updateProductQuantityHandler(
          state.lineItems,
          action.payload.product,
          action.payload.quantity
        ),
      };
    }
  }
};

const removeProductHandler = (
  lineItems: LineItem[],
  productId: number
): Partial<State> => {
  const updatedLineItems = lineItems.filter(
    (item) => item.product.id !== productId
  );
  return {
    lineItems: updatedLineItems,
    cartCount: updatedLineItems.reduce((acc, item) => acc + item.quantity, 0),
    cartTotal: updatedLineItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
};

const updateProductQuantityHandler = (
  lineItems: LineItem[],
  product: Product,
  quantity: number
): Partial<State> => {
  const productDoesExist =
    lineItems.findIndex((l) => l.product.id === product.id) !== -1;
  let updatedLineItems: LineItem[] = [];
  if (productDoesExist) {
    lineItems.forEach((item) => {
      if (item.product.id === product.id) {
        const updatedQuantity = item.quantity + quantity;
        if (updatedQuantity > 0) {
          updatedLineItems.push({
            ...item,
            quantity: updatedQuantity,
          });
        }
      } else {
        updatedLineItems.push(item);
      }
    });
  } else {
    if (quantity > 0) {
      updatedLineItems = [
        ...lineItems,
        {
          product,
          quantity,
        },
      ];
    }
  }

  return {
    lineItems: updatedLineItems,
    cartCount: updatedLineItems.reduce((acc, item) => acc + item.quantity, 0),
    cartTotal: updatedLineItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
};

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, stateInit);

  useEffect(() => {
    const { lineItems, cartCount, cartTotal } = state;
    localStorage.setItem(
      LOCAL_STORAGE_CART_KEY,
      JSON.stringify({
        lineItems,
        cartCount,
        cartTotal,
      })
    );
  }, [state.cartCount, state.cartTotal, state.lineItems]);

  const removeProduct = useCallback(
    (productId: number) =>
      dispatch({
        type: "REMOVE_PRODUCT",
        payload: {
          productId,
        },
      }),
    [dispatch]
  );

  const updateProductQuantity = useCallback(
    (product: Product, quantity: number) =>
      dispatch({
        type: "UPDATE_PRODUCT_QUANTITY",
        payload: {
          product,
          quantity,
        },
      }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      removeProduct,
      updateProductQuantity,
    }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export default CartProvider;
