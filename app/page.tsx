// import HomeCarousel from '@/components/homeCarousel'
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import { stripe } from '@/lib/stripe'
import HomeCarousel from '@/components/HomeCarousel'
import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'


export default async function HomePage() {
   const candles= await getData()

   
   return (
     <main className="flex  flex-col items-center justify-between p-24">
  

<HomeCarousel candles={candles} />
    </main>
  )
}


 async function  getData (){
   const response = await stripe.products.list({
     expand: ['data.default_price']
   })



   const candles = response.data.map(candle => {
     const price = candle.default_price as Stripe.Price;
     return {
       id: candle.id,
       name: candle.name,
       image: candle.images[0],
       price: new Intl.NumberFormat( "pt-BR", {

         style: 'currency',
         currency: 'BRL'
       }).format(price.unit_amount! / 100)
     }
   })
   return candles;

}
