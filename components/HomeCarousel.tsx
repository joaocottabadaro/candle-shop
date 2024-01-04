"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { Card } from "./ui/card";
import { FlameIcon } from "lucide-react";

interface HomeCarouselProps {
  candles: {
    id: string;
    image: string;
    name: string;
    price: string;
  }[];
}

export default function HomeCarousel({ candles }: HomeCarouselProps) {
  function updateCart(id: string) {
    console.log("🚀 ~ file: homeCarousel.tsx:31 ~ updateCart ~ id:", id);
  }

  return (
    <section className="flex w-full flex-col items-center justify-between px-6">
      <Carousel className="w-full">
        <CarouselContent>
          {candles.map((candle) => {
            return (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3 p-12"
                key={candle.id}
              >
                <Link href={`/candle/${candle.id}`}>
                  <div className="w-full  flex items-center flex-col">
                    <Image
                      src={candle.image}
                      alt={candle.name}
                      width={500}
                      height={200}
                    />

                    <footer className="flex justify-between items-center  py-5 flex-row w-full">
                      <div className="flex flex-col">
                        <strong className="text-3xl font-bold ">
                          {candle.name}
                        </strong>
                        <span className="">Price: ${candle.price}</span>
                      </div>

                      {/* <div
                        className="z-10"
                        onClick={() => updateCart(candle.id)}
                      >
                        <FlameIcon />
                      </div> */}
                    </footer>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
