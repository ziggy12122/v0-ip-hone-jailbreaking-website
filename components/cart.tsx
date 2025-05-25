"use client"

import { useState } from "react"
import { X, Trash2, CreditCard, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CartProps {
  cart: any[]
  onClose: () => void
  onRemoveItem: (id: number) => void
}

export default function Cart({ cart, onClose, onRemoveItem }: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    phone: "",
    name: "",
    discord: "",
  })

  const total = cart.reduce((sum, item) => sum + (typeof item.price === "number" ? item.price : 0), 0)

  const generateOrderId = () => {
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  const handleCheckout = () => {
    // Generate order ID
    const orderId = generateOrderId()

    // Store payment data for verification page
    const paymentData = {
      items: cart,
      total,
      customerInfo,
      orderId,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("paymentData", JSON.stringify(paymentData))

    // Open Cash App link
    const cashAppLink = `https://cash.app/$EthanCreel1/${total.toFixed(2)}`
    window.open(cashAppLink, "_blank")

    // Redirect to verification page after a short delay
    setTimeout(() => {
      window.location.href = "/payment-verification"
    }, 1000)
  }

  if (showCheckout) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Checkout</CardTitle>
                <CardDescription>Complete your purchase</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowCheckout(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div>
              <h3 className="font-semibold mb-4">Order Summary</h3>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.platform && <p className="text-sm text-gray-500">Platform: {item.platform}</p>}
                    {item.config && (
                      <div className="text-sm text-gray-600">
                        {item.gameType === "gta" && (
                          <>
                            {item.config.level && <span>Level: {item.config.level} • </span>}
                            {item.config.money && <span>${item.config.money}M • </span>}
                            {item.config.allProperties && <span>All Properties • </span>}
                            {item.config.moddedStats && <span>Modded Stats • </span>}
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
                                •{" "}
                              </span>
                            )}
                            {item.config.skinCount && <span>{item.config.skinCount} skins • </span>}
                            {item.config.vbucksAmount && <span>{item.config.vbucksAmount} V-Bucks • </span>}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold">
                    ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                  </span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discord">Discord Username (Optional)</Label>
                <Input
                  id="discord"
                  value={customerInfo.discord}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, discord: e.target.value })}
                  placeholder="username#1234"
                />
              </div>
            </div>

            {/* Payment Instructions */}
            <Alert className="border-blue-200 bg-blue-50">
              <CreditCard className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">Payment Process:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Click "Complete Purchase" below</li>
                    <li>You'll be redirected to Cash App to pay ${total.toFixed(2)}</li>
                    <li>After payment, you'll see a verification screen</li>
                    <li>Take a screenshot of your payment and send it via text</li>
                    <li>Receive your account within 24 hours</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>

            {/* Payment Button */}
            <div className="space-y-4">
              <Button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                disabled={!customerInfo.phone || !customerInfo.name}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Complete Purchase - ${total.toFixed(2)}
              </Button>
            </div>

            {/* Back Button */}
            <Button variant="outline" onClick={() => setShowCheckout(false)} className="w-full">
              Back to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Cart</CardTitle>
              <CardDescription>{cart.length} items</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={item.id || index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Continue Shopping
                </Button>
                <Button onClick={() => setShowCheckout(true)} className="flex-1" disabled={cart.length === 0}>
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
