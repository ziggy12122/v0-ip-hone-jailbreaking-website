"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Cart from "./cart"

interface FloatingCartProps {
  cart: any[]
  onRemoveItem: (id: number) => void
}

export default function FloatingCart({ cart, onRemoveItem }: FloatingCartProps) {
  const [showCart, setShowCart] = useState(false)

  const total = cart.reduce((sum, item) => sum + (typeof item.price === "number" ? item.price : 0), 0)

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowCart(true)}
          className="relative bg-purple-600 hover:bg-purple-700 rounded-full w-16 h-16 shadow-lg"
          size="lg"
        >
          <ShoppingCart className="h-6 w-6" />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cart.length}
            </Badge>
          )}
        </Button>
        {cart.length > 0 && (
          <div className="absolute -top-12 right-0 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
            ${total.toFixed(2)}
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && <Cart cart={cart} onClose={() => setShowCart(false)} onRemoveItem={onRemoveItem} />}
    </>
  )
}
