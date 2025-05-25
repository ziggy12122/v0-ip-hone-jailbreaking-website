"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface CheckoutData {
  items: any[]
  total: number
}

export default function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    phone: "",
    name: "",
  })

  useEffect(() => {
    const data = localStorage.getItem("checkoutData")
    if (data) {
      setCheckoutData(JSON.parse(data))
    }
  }, [])

  const handlePayment = () => {
    if (!checkoutData) return
    const cashAppLink = `https://cash.app/$EthanCreel1/${checkoutData.total.toFixed(2)}`
    window.open(cashAppLink, "_blank")
  }

  const openSMSApp = () => {
    const smsBody = encodeURIComponent(
      `Payment confirmation - Total: $${checkoutData?.total.toFixed(2)} - Customer: ${customerInfo.name} (${customerInfo.phone})`,
    )
    window.open(`sms:7656156371?body=${smsBody}`, "_blank")
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Cart Empty</CardTitle>
            <CardDescription>No items to checkout</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/shop">
              <Button className="w-full">Return to Shop</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Xutix
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {checkoutData.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${checkoutData.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Your Name"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!customerInfo.phone || !customerInfo.name}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Pay ${checkoutData.total.toFixed(2)} with Cash App
              </Button>

              <Button onClick={openSMSApp} variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Payment Screenshot
              </Button>
            </div>

            <div className="text-sm text-gray-600 text-center">
              <p>1. Pay with Cash App</p>
              <p>2. Text screenshot to (765) 615-6371</p>
              <p>3. Receive account within 24 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
