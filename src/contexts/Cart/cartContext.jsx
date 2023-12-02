import React, { useEffect } from "react";

import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      return storedCartItems || [];
    } catch (error) {
      console.error("Erro ao recuperar dados do localStorage:", error);
      return [];
    }
  });

  function addToCart(item) {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((prevItem) => prevItem.id === item.id);

      if (itemExists) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + 1 }
            : prevItem
        );
      } else {
        const newItem = { ...item, quantity: 1, timestamp: new Date().getTime() };
        return [...prevItems, newItem];
      }
    });
  }

  function removeFromCart(itemId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  }

  function removeExpiredItems() {
    const currentTime = new Date().getTime();
    const updatedCartItems = cartItems.filter((item) => {
      const timeLimit = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
      return currentTime - item.timestamp <= timeLimit;
    });

    setCartItems(updatedCartItems);
  }

  function incrementQuantity(itemId) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function removeQuantity(itemId) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  // function clearCart() {
  //   setCartItems([]);
  // }

  function clearCart() {
    if (window.confirm("Tem certeza de que deseja limpar o carrinho?")) {
      setCartItems([]);
    }
  }

  useEffect(() => {
    // Verifica e remove itens expirados a cada 1 hora
    const cleanupInterval = setInterval(removeExpiredItems, 60 * 60 * 1000); // 1 hora em milissegundos

    return () => {
      clearInterval(cleanupInterval);
    };
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erro ao armazenar dados no localStorage:", error);
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, incrementQuantity, removeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}