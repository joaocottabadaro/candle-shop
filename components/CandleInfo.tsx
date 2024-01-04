"use client";

import { useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";

interface CandleInfoProps {
  candle: {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}
export default function CandleInfo({ candle }: CandleInfoProps) {
  const cart = useShoppingCart();
  const { addItem } = cart;
  const { name, price, defaultPriceId, image, description } = candle;

  const [quantity, setQuantity] = useState(1);

  const formattedCandleData = {
    name: name,
    id: defaultPriceId,
    price: price,
    image,
    currency: "BRL",
    description: description,
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    addItem(formattedCandleData, { count: quantity });
    setQuantity(1);
  };

  return (
    <article className="flex  flex-col gap-3 bg-elements p-8 rounded-xl shadow-md text-center ">
      <h1 className="text-3xl text-primary-foreground">{name}</h1>
      <p>{description}</p>
      <div className="text-primary-foreground text-2xl font-semibold mt-auto">
        {price}
      </div>
      <div className="flex justify-around items-center mt-4 mb-2 ">
        <button
          onClick={decreaseQuantity}
          className="hover:text-title hover:bg-primary w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <span className="w-10 text-center rounded-md mx-3 text-primary-foreground">
          {quantity}
        </span>
        <button
          onClick={increaseQuantity}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          +
        </button>
      </div>
      <button
        onClick={() => addToCart()}
        className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2"
      >
        Add to cart
      </button>
    </article>
  );
}
