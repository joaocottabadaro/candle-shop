import { loadStripe, Stripe } from "@stripe/stripe-js"
import { type ClassValue, clsx } from "clsx"

import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */

let stripePromise: Promise<Stripe | null>

export default function getStripe(): Promise<Stripe | null> {
  if (!stripePromise)
    stripePromise = loadStripe(
      process.env.STRIPE_PUBLISHABLE_KEY as string
    )

  return stripePromise
}
