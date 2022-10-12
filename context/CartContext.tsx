import React, { createContext, useContext, useState, ReactNode } from "react";

type CartProps = { children: ReactNode };
type CartItem = {
  id: number;
  quantity: number;
};

interface CartContext {
  addProductToCart: (id: number) => void;
  removeProductFromCart: (id: number) => void;
  getCartQuantity: () => number;
}
const CartContext = createContext({} as CartContext);

export const useCartContext = () => {
  return useContext(CartContext);
};

const addToCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCart = () => {
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
  let cartTotalQuantity: number;

  const getCartQuantity = (): number => {
    let total: number[] = [];
    cart.forEach((product) => {
      total.push(product.quantity);
    });
    return (cartTotalQuantity = total.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    ));
  };

  const addProductToCart = (id: number): void => {
    let foundProduct = cart.find((product: CartItem) => product.id === id);
    console.log(foundProduct);
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

  const removeProductFromCart = (id: number): void => {
    addToCart(cart.filter((product: CartItem) => product.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ getCartQuantity, addProductToCart, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
