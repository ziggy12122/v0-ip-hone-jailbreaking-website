"use client"

import Link from "next/link"
import { ArrowRight, Smartphone, Cpu, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Xutix
          </Link>
          <Link href="/shop">
            <Button>Shop</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Professional Tech Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert iPhone jailbreaking, PC optimization, and premium gaming accounts. Fast, reliable, and affordable
            solutions for all your tech needs.
          </p>
          <Link href="/shop">
            <Button size="lg" className="text-lg px-8 py-4">
              Browse Services <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional tech services designed to enhance your digital experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">iPhone Jailbreaking</h3>
              <p className="text-gray-600">
                Unlock your iPhone's full potential with our professional jailbreaking services. Choose between Nugget
                or complete jailbreak options.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Cpu className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">PC Optimization</h3>
              <p className="text-gray-600">
                Transform your slow PC into a high-performance machine with remote optimization using AnyDesk. Same-day
                service available.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                <Gamepad2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gaming Accounts</h3>
              <p className="text-gray-600">
                Premium modded gaming accounts with unlocked content and high-level features. GTA V, Fortnite, Valorant,
                and Rainbow Six Siege available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our products and services to enhance your digital experience today
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              View All Services
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
