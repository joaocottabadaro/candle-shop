import { stripe } from "@/stripe"
import { Description } from "@radix-ui/react-dialog";
import { Currency } from "lucide-react";
import { headers } from "next/headers"
import Stripe from "stripe";
import { validateCartItems } from "use-shopping-cart/utilities"

export async function POST(request: Request) {
  //const inventory = products

  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const candles = response.data.map((candle) => {
    const price = candle.default_price as Stripe.Price;
    return {
      id: price.id,
    name: candle.name,
    description: candle.description as string,
    image: candle.images[0],
    price: price.unit_amount as number,
    currency:"BRL",
    };
  });
  
  
  console.log("🚀 ~ file: route.ts:26 ~ candles ~ candles:", candles)

  

  const cartProducts = await request.json()
  console.log("🚀 ~ file: route.ts:32 ~ POST ~ cartProducts:", cartProducts)

  const line_items = validateCartItems(candles, cartProducts)

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    line_items,
    success_url: `${process.env.NEXT_URL }/success`,
    cancel_url: `${process.env.NEXT_URL }/error`
  })
  return Response.json({ sessionId: checkoutSession.id, checkoutUrl:checkoutSession.url }, {status: 200})
}
