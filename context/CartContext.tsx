import React, { createContext, useContext, useState, ReactNode } from "react";

type CartProps = { children: ReactNode };
type CartItem = {
  id: number;
  quantity: number;
};

interface CartContext {
  cartTotalQuantity: number;
  setCartTotalQuantity: (cartTotalQuantity: number) => void;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
  getCart: () => [] | CartItem[];
  getCartQuantity: () => number;
  getProductQuantity: (id: number) => number | undefined;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeProductFromCart: (id: number) => void;
}

const CartContext = createContext({} as CartContext);

export const useCartContext = () => {
  return useContext(CartContext);
};

const addToCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  let cart: string | null = null;
  if (typeof window !== "undefined") {
    cart = localStorage?.getItem("cart");
  }
  if (!cart) {
    return [];
  } else {
    return JSON.parse(cart);
  }
};

export const CartProvider = ({ children }: CartProps) => {
  let cart: CartItem[] = getCart();
  const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const getCartQuantity = (): number => {
    let total: number[] = [];
    cart.forEach((product) => {
      total.push(product.quantity);
    });
    setCartTotalQuantity(() =>
      total.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
    );
    return cartTotalQuantity;
  };

  const getProductQuantity = (id: number): number => {
    let foundProduct = cart.find((product: CartItem) => product.id === id);
    if (!foundProduct) {
      return 0;
    }
    return foundProduct.quantity;
  };

  const increaseQuantity = (id: number): void => {
    let foundProduct = cart.find((product: CartItem) => product.id === id);
    if (foundProduct == undefined) {
      foundProduct = {
        id: id,
        quantity: 1,
      };
      cart.push(foundProduct);
      addToCart(cart);
    } else {
      foundProduct.quantity++;
      addToCart(cart);
    }
  };

  const decreaseQuantity = (id: number) => {
    let foundProduct = cart.find((product: CartItem) => product.id === id);
    if (foundProduct !== undefined) {
      foundProduct.quantity--;
      addToCart(cart);
    }
  };

  const removeProductFromCart = (id: number): void => {
    addToCart(cart.filter((product: CartItem) => product.id !== id));
    if (cart.length === 0) {
      localStorage.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        anchorEl,
        setAnchorEl,
        cartTotalQuantity,
        setCartTotalQuantity,
        getCart,
        getCartQuantity,
        getProductQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
