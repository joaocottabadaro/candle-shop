import Stripe from "stripe";
import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions/stripe";
import CandleInfo from "@/components/CandleInfo";

export async function generateStaticParams() {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const candles = response.data.map((candle) => {
    return {
      id: candle.id,
    };
  });
  return candles;
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getCandleData(params.id);

  return (
    <main className="grid  grid-cols-2	items-center stretch justify-center">
      <div className="flex items-center justify-center">
        <Image src={data.image} width={300} height={300} alt={data.name} />
      </div>
      <CandleInfo candle={data} />
    </main>
  );
}

async function getCandleData(id: string) {
  const candle = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });
  console.log("🚀 ~ file: page.tsx:38 ~ getCandleData ~ candle:", candle);

  const price = candle.default_price as Stripe.Price;
  return {
    id: candle.id,
    name: candle.name,
    description: candle.description as string,
    image: candle.images[0],
    price: price.unit_amount as number,
    defaultPriceId: price.id,
  };
}
