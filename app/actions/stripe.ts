'use server'
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { headers } from 'next/headers'
import { redirect } from "next/navigation"

export async function createCheckoutSession(data: FormData): Promise<void> {
    const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
        mode: 'payment',
        ui_mode: 'embedded',
        line_items: [
            {

              price: "price_1ONGcRDRAVD0t0sAXwXU4E2E",
              quantity: 1,
            },
        ],
        return_url: `${headers().get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`
      })
      
      console.log("🚀 ~ file: stripe.ts:9 ~ createCheckoutSession ~ checkoutSession:", checkoutSession)

  }