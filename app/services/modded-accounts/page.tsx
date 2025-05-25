"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Gamepad2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AccountBuilder from "@/components/account-builder"
import FloatingCart from "@/components/floating-cart"

export default function ModdedAccountsService() {
  const [cart, setCart] = useState<any[]>([])
  const [showBuilder, setShowBuilder] = useState<string | null>(null)

  const accounts = [
    {
      id: "gta",
      name: "GTA V Account",
      price: "From $25",
      description:
        "High-level GTA V account with customizable wealth, level, and unlocked content. No bans guaranteed.",
      options: [
        "Custom character level (1-8000)",
        "In-game cash (up to $2B)",
        "All properties & businesses",
        "Modded outfits & clothing",
        "Fast run & enhanced stats",
        "All weapons research",
        "Modded K/D ratio",
        "All platforms available",
      ],
      customizable: true,
      popular: true,
    },
    {
      id: "fortnite",
      name: "Fortnite Account",
      price: "From $10",
      description: "Premium Fortnite account with rare skins, V-Bucks, or custom configurations. No bans guaranteed.",
      options: [
        "OG skins (Renegade Raider, Black Knight)",
        "Tryhard skins (Aura, Crystal, Dynamo)",
        "Stacked accounts (mix of everything)",
        "V-Bucks loaded accounts",
        "Custom skin count (1-1000+)",
        "Battle pass completion",
        "All platforms supported",
        "Save the World access",
      ],
      customizable: true,
      popular: true,
    },
    {
      id: "valorant",
      name: "Valorant Account",
      price: "From $35",
      description: "High-rank Valorant account with premium skins and competitive status. No bans guaranteed.",
      options: [
        "Custom rank (Iron to Radiant)",
        "Premium skin collections",
        "Prime Vandal & Reaver Operator",
        "All agents unlocked",
        "Clean match history",
        "Custom RR points",
        "Night Market access",
        "Battle pass completion",
      ],
      customizable: true,
      popular: false,
    },
    {
      id: "r6",
      name: "Rainbow Six Siege",
      price: "From $28",
      description: "High-level R6 account with all operators and premium content. No bans guaranteed.",
      options: [
        "Custom rank (Copper to Champion)",
        "All 65+ operators unlocked",
        "Black Ice skin collection",
        "Elite uniforms & sets",
        "Custom K/D ratio",
        "Renown & R6 Credits",
        "Alpha Pack collection",
        "Season pass completion",
      ],
      customizable: true,
      popular: false,
    },
  ]

  const addToCart = (item: any) => {
    setCart([...cart, { ...item, id: Date.now() }])
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const handleAccountAction = (account: any) => {
    setShowBuilder(account.id)
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
          <Gamepad2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Gaming Accounts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Premium gaming accounts with customizable features and instant delivery. All accounts come with no ban
            guarantee. Choose your perfect setup and customize every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className={`hover:shadow-lg transition-shadow ${account.popular ? "ring-2 ring-purple-600" : ""}`}
            >
              <CardHeader className="text-center">
                {account.popular && <Badge className="w-fit mx-auto mb-2 bg-purple-600">Popular</Badge>}
                <Badge className="w-fit mx-auto mb-2 bg-green-600">No Bans</Badge>
                <Badge className="w-fit mx-auto mb-2 bg-blue-600">Fully Customizable</Badge>
                <CardTitle className="text-xl">{account.name}</CardTitle>
                <CardDescription className="text-gray-600">{account.description}</CardDescription>
                <div className="text-2xl font-bold text-purple-600 mt-2">{account.price}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Customization Options:</h4>
                  <ul className="space-y-1">
                    {account.options.map((option, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full" onClick={() => handleAccountAction(account)}>
                  Customize Account
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showBuilder && (
        <AccountBuilder gameType={showBuilder} onClose={() => setShowBuilder(null)} onAddToCart={addToCart} />
      )}

      <FloatingCart cart={cart} onRemoveItem={removeFromCart} />
    </div>
  )
}
