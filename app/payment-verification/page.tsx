"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, MessageCircle, CheckCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PaymentData {
  items: any[]
  total: number
  customerInfo: {
    name: string
    phone: string
  }
  orderId: string
}

export default function PaymentVerificationPage() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    const data = localStorage.getItem("paymentData")
    if (data) {
      setPaymentData(JSON.parse(data))
    }

    // Timer to show how long they've been waiting
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const openSMSApp = () => {
    if (!paymentData) return
    const smsBody = encodeURIComponent(
      `Payment screenshot for Order #${paymentData.orderId} - Total: $${paymentData.total.toFixed(2)} - Customer: ${paymentData.customerInfo.name} (${paymentData.customerInfo.phone})`,
    )
    window.open(`sms:7656156371?body=${smsBody}`, "_blank")
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Payment Data</CardTitle>
            <CardDescription>Please complete your purchase first</CardDescription>
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Xutix
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Status Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 p-4 bg-yellow-100 rounded-full w-fit">
            <Clock className="h-12 w-12 text-yellow-600 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Verification Pending</h1>
          <p className="text-gray-600">We're waiting for your payment screenshot to complete your order</p>
          <Badge className="mt-4 bg-yellow-100 text-yellow-800">
            Waiting for verification • {formatTime(timeElapsed)}
          </Badge>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Order #{paymentData.orderId}
            </CardTitle>
            <CardDescription>Payment sent, awaiting verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Customer Information</h4>
              <div className="bg-gray-50 p-3 rounded">
                <p>
                  <strong>Name:</strong> {paymentData.customerInfo.name}
                </p>
                <p>
                  <strong>Phone:</strong> {paymentData.customerInfo.phone}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Order Items</h4>
              {paymentData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    {item.config && (
                      <div className="text-sm text-gray-600">
                        {item.gameType === "gta" && (
                          <>
                            {item.config.level && <span>Level: {item.config.level} • </span>}
                            {item.config.money && <span>${item.config.money}M • </span>}
                            {item.config.platform && <span>{item.config.platform}</span>}
                          </>
                        )}
                        {item.gameType === "fortnite" && (
                          <>
                            {item.config.accountType && (
                              <span>
                                {
                                  {
                                    og: "OG Account",
                                    tryhard: "Tryhard Account",
                                    stacked: "Stacked Account",
                                    vbucks: "V-Bucks Ready",
                                  }[item.config.accountType]
                                }{" "}
                                •
                              </span>
                            )}
                            {item.config.skinCount && <span>{item.config.skinCount} skins • </span>}
                            {item.config.platform && <span>{item.config.platform}</span>}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Paid:</span>
              <span className="text-green-600">${paymentData.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Verification Instructions */}
        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
          <MessageCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <p className="font-semibold text-yellow-800">Next Steps:</p>
              <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                <li>Take a screenshot of your Cash App payment confirmation</li>
                <li>Click the button below to open your text messaging app</li>
                <li>
                  Send the screenshot to <strong>(765) 615-6371</strong>
                </li>
                <li>
                  Include your order number: <strong>#{paymentData.orderId}</strong>
                </li>
                <li>We'll verify and deliver your account within 24 hours</li>
              </ol>
            </div>
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button onClick={openSMSApp} className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
            <MessageCircle className="h-5 w-5 mr-2" />
            Send Payment Screenshot
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" asChild>
              <a href="sms:7656156371" className="flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                Text Us
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {/* Status Timeline */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Order Status Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Order Placed</span>
                <span className="text-gray-500 text-sm ml-auto">Just now</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Payment Sent</span>
                <span className="text-gray-500 text-sm ml-auto">Just now</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-yellow-600 font-medium">Awaiting Payment Verification</span>
                <span className="text-gray-500 text-sm ml-auto">Current</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-400">Account Delivery</span>
                <span className="text-gray-400 text-sm ml-auto">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">Need help? Contact us:</p>
          <div className="flex justify-center gap-4">
            <a href="sms:7656156371" className="text-blue-600 hover:underline flex items-center gap-1">
              <Phone className="h-3 w-3" />
              (765) 615-6371
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
