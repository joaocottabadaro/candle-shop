"use client";

import React, { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      cartMode="checkout-session"
      stripe={
        "pk_test_51OMKUBDRAVD0t0sA9ULkJv2F4Y3qDM6zTIOM5IaTommYGDzsmuwR2EbHAGa5uLrBIki6igWubYZC4OsbHTRkeeYh003j7oPilG"
      }
      currency="BRL"
      shouldPersist
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider;
