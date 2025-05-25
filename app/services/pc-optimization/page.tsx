"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Cpu, CheckCircle, Star, Shield, Zap, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FloatingCart from "@/components/floating-cart"

export default function PCOptimizationService() {
  const [cart, setCart] = useState<any[]>([])

  const service = {
    name: "Complete PC Optimization",
    price: 20,
    description: "Professional remote PC optimization using AnyDesk for maximum performance",
    features: [
      "Remote access via AnyDesk",
      "Complete registry cleaning",
      "Startup optimization",
      "Driver updates & installation",
      "Malware & bloatware removal",
      "System file repair",
      "Performance tweaking",
      "Gaming optimization",
      "Memory optimization",
      "Disk cleanup & defrag",
      "Same-day service",
      "30-day support included",
    ],
  }

  const optimizations = [
    {
      title: "Registry Cleaning",
      description: "Deep clean and optimize Windows registry for better performance",
      icon: <Zap className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Startup Optimization",
      description: "Disable unnecessary startup programs for lightning-fast boot times",
      icon: <Cpu className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Driver Updates",
      description: "Update all drivers to latest versions for optimal hardware performance",
      icon: <Shield className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Malware Removal",
      description: "Complete scan and removal of viruses, malware, and unwanted software",
      icon: <CheckCircle className="h-6 w-6 text-red-600" />,
    },
  ]

  const addToCart = () => {
    setCart([...cart, { ...service, id: Date.now(), type: "pc-optimization" }])
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Xutix
            </Link>
          </div>
          <Button variant="outline" className="border-green-400 text-green-600 hover:bg-green-50">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({cart.length})
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mx-auto mb-6 p-4 bg-green-100 rounded-full w-fit">
              <Cpu className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional PC Optimization</h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your slow PC into a high-performance machine with our remote optimization service using AnyDesk.
              Professional technicians will optimize your computer while you watch.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Remote & Safe
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                4.9/5 Rating
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                1000+ PCs Optimized
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Package */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Optimization Package</h2>
            <p className="text-xl text-gray-600">Everything your PC needs for maximum performance</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border-0 shadow-xl ring-2 ring-green-600 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <Badge className="w-fit mx-auto mb-4 bg-green-600">Best Value</Badge>
                <CardTitle className="text-3xl text-gray-900">{service.name}</CardTitle>
                <CardDescription className="text-gray-600 text-lg">{service.description}</CardDescription>
                <div className="text-5xl font-bold text-green-600 mt-6">${service.price}</div>
                <p className="text-gray-500">One-time payment</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6" onClick={addToCart}>
                  Add to Cart
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Service completed within 24 hours • AnyDesk required
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Optimize</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {optimizations.map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    {item.icon}
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Purchase Service</h3>
                <p className="text-gray-600 text-sm">Order our PC optimization service for $20</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Install AnyDesk</h3>
                <p className="text-gray-600 text-sm">Download and install AnyDesk for remote access</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Remote Optimization</h3>
                <p className="text-gray-600 text-sm">Our expert optimizes your PC while you watch</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Enjoy Performance</h3>
                <p className="text-gray-600 text-sm">Experience your newly optimized, faster PC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Expected Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-8 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-4">Before Optimization</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Slow startup (3-5 minutes)</li>
                  <li>• Frequent freezing and crashes</li>
                  <li>• High CPU and memory usage</li>
                  <li>• Slow file transfers and loading</li>
                  <li>• Poor gaming and app performance</li>
                  <li>• System errors and blue screens</li>
                </ul>
              </div>
              <div className="bg-green-50 p-8 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">After Optimization</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Lightning-fast startup (30-60 seconds)</li>
                  <li>• Stable and responsive system</li>
                  <li>• Optimized resource usage</li>
                  <li>• Faster file operations and loading</li>
                  <li>• Enhanced gaming and app performance</li>
                  <li>• Clean, error-free operation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart */}
      <FloatingCart cart={cart} onRemoveItem={removeFromCart} />
    </div>
  )
}
