import "./globals.css";
import Header from "@/components/Header";
import CartProvider from "./provider";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background  text-white antialiased",
          poppins
        )}
      >
        <CartProvider>
          <Header /> {children}
        </CartProvider>
      </body>
    </html>
  );
}
