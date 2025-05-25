"use client"

import Link from "next/link"
import { ArrowLeft, Smartphone, Cpu, Gamepad2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Shop() {
  const services = [
    {
      id: "jailbreak",
      title: "iPhone Jailbreaking",
      description: "Professional jailbreaking services with multiple options for your iOS device.",
      icon: <Smartphone className="h-10 w-10 text-blue-600" />,
      price: "From $10",
      href: "/services/jailbreak",
    },
    {
      id: "pc-optimization",
      title: "PC Optimization",
      description: "Complete remote PC optimization using AnyDesk for maximum performance.",
      icon: <Cpu className="h-10 w-10 text-green-600" />,
      price: "$20",
      href: "/services/pc-optimization",
    },
    {
      id: "modded-accounts",
      title: "Gaming Accounts",
      description: "Premium modded gaming accounts for popular games with custom options.",
      icon: <Gamepad2 className="h-10 w-10 text-purple-600" />,
      price: "From $10",
      href: "/services/modded-accounts",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
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
          <h1 className="text-4xl font-bold mb-4">Our Products & Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our range of professional tech services and premium gaming accounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
                <div className="text-2xl font-bold text-blue-600 mt-4">{service.price}</div>
              </CardHeader>
              <CardContent>
                <Link href={service.href}>
                  <Button className="w-full">
                    View Options <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
