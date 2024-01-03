
import Stripe from "stripe";
import Image from 'next/image'
import { stripe } from "@/lib/stripe";

export async function generateStaticParams() {

   

    const response = await stripe.products.list({
        expand: ['data.default_price']
      })
      console.log("🚀 ~ file: page.tsx:15 ~ getServerSideProps ~ response:", response.data)
    
      const candles = response.data.map(candle => {
        return {
          id: candle.id,
        
        }
      })
      return candles;
  }





export default async function Page({ params }:  { params: { id: string } }) {
console.log("🚀 ~ file: page.tsx:29 ~ Page ~ params:", params)


    const data= await getCandleData(params.id)

    return (<div className="w-full max-w-md flex itemc-center" >
    <Image src={data.image} alt={data.name} width={200} height={200} />
    <h1 className="text-3xl font-bold text-center">{data.name}</h1>
    <p className="text-center">{data.description}</p>
    <p className="text-center">Price: ${data.price}</p> 
  </div>)
  }



  
async function  getCandleData (id:string){
    const candle = await stripe.products.retrieve(id,{
      expand: ['default_price']
    })
    console.log("🚀 ~ file: page.tsx:43 ~ getCandleData ~ candle:", candle)

  
  
      const price = candle.default_price as Stripe.Price;
      return {
        id: candle.id,
        name: candle.name,
        description: candle.description,
        image: candle.images[0],
        price: new Intl.NumberFormat( "pt-BR", {
  
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100)
    }

  
  }
  