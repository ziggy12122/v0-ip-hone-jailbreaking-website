"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Smartphone, CheckCircle, Star, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FloatingCart from "@/components/floating-cart"

export default function JailbreakService() {
  const [cart, setCart] = useState<any[]>([])

  const packages = [
    {
      id: "nugget",
      name: "Nugget iOS Jailbreak",
      price: 10,
      description: "Simple and safe jailbreak using Nugget for basic customizations",
      features: [
        "iOS 15-17 support",
        "Nugget tool installation",
        "Basic customizations",
        "Safe and reversible",
        "Email support",
      ],
      popular: false,
    },
    {
      id: "full",
      name: "Complete Jailbreak Service",
      price: 25,
      description: "Full jailbreaking service with all features and unlimited customizations",
      features: [
        "All iOS versions supported",
        "Cydia + Sileo installation",
        "Unlimited tweaks",
        "Custom themes & icons",
        "Advanced modifications",
        "Priority support",
        "Remote assistance",
      ],
      popular: true,
    },
  ]

  const addToCart = (pkg: any) => {
    setCart([...cart, { ...pkg, id: Date.now(), type: "jailbreak" }])
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
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

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 p-4 bg-blue-100 rounded-full w-fit">
            <Smartphone className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-6">iPhone Jailbreaking Services</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose between our Nugget iOS jailbreak for basic customizations or our complete jailbreak service for
            unlimited modifications. Professional service guaranteed.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              100% Safe
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              4.9/5 Rating
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              1000+ Satisfied Customers
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`hover:shadow-lg transition-shadow ${pkg.popular ? "ring-2 ring-blue-600" : ""}`}
            >
              <CardHeader className="text-center">
                {pkg.popular && <Badge className="w-fit mx-auto mb-2 bg-blue-600">Most Popular</Badge>}
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">${pkg.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${pkg.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                  onClick={() => addToCart(pkg)}
                >
                  Add to Cart - ${pkg.price}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <FloatingCart cart={cart} onRemoveItem={removeFromCart} />
    </div>
  )
}
