"use client";
import { FlameIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

export default function Header() {
  const {
    handleCartClick,
    cartCount,
    cartDetails,
    shouldDisplayCart,
    formattedTotalPrice,
    clearCart,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleClick() {
    try {
      const res = await fetch("/session", {
        method: "POST",
        body: JSON.stringify(cartDetails),
      });
      const data = await res.json();
      console.log("🚀 ~ file: Header.tsx:39 ~ handleClick ~ data:", data);
      const result = await redirectToCheckout(data.sessionId);
      if (result?.error) {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="fixed flex w-full flex-row  justify-between p-12 mb-12">
      <Link href={"/"}>
        <FlameIcon />{" "}
      </Link>

      <div
        className="relative bg-elements p-3"
        onClick={() => handleCartClick()}
      >
        <Image src={"/cart.svg"} height={32} width={32} alt="cart" />
        <div className="rounded-full flex justify-center items-center bg-secondary text-xs text-white absolute w-6 h-5 top-0 right-0">
          {cartCount}
        </div>
      </div>

      <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sacola de compras</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col flex-wrap gap-4 mb-5 ">
            {cartDetails &&
              Object.keys(cartDetails ?? {}).map((key) => {
                const candle = cartDetails[key];
                return (
                  <div className="flex justify-between w-full" key={key}>
                    <Image
                      src={candle.image as string}
                      height={100}
                      width={100}
                      alt={candle.name}
                    />
                    <div className="flex flex-col">
                      <h3>{candle.name}</h3>
                      <p>{candle.description}</p>
                      <strong>{candle.formattedValue}</strong>
                      <strong>{candle.quantity}</strong>
                    </div>
                  </div>
                );
              })}
            <div className="flex  justify-between">
              <p>Quantidade</p>
              <span>{cartCount}</span>
            </div>
            <div className="flex justify-between">
              <p>Preço total</p>
              <span>{formattedTotalPrice}</span>
            </div>
          </div>
          <SheetFooter className="flex-wrap">
            <Button onClick={() => clearCart()}>Remover todos os itens</Button>
            <Button onClick={() => handleClick()}> Finalizar compra</Button>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
