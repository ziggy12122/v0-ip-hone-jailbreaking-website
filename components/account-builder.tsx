"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AccountBuilderProps {
  gameType: string
  onClose: () => void
  onAddToCart: (item: any) => void
}

export default function AccountBuilder({ gameType, onClose, onAddToCart }: AccountBuilderProps) {
  const [config, setConfig] = useState<any>({})
  const [totalPrice, setTotalPrice] = useState(0)

  const gtaOptions = {
    level: { basePrice: 25, pricePerLevel: 0.01 },
    money: { pricePerMillion: 1 },
    allProperties: { price: 15 },
    moddedOutfits: { price: 10 },
    fastRun: { price: 8 },
    weaponsResearch: { price: 12 },
    moddedStats: { price: 20 },
  }

  const fortniteAccountTypes = {
    og: {
      name: "OG Account",
      basePrice: 30,
      pricePerSkin: 2,
      description: "Original skins from early seasons",
    },
    tryhard: {
      name: "Tryhard Account",
      basePrice: 20,
      pricePerSkin: 1,
      description: "Competitive skins and clean combos",
    },
    stacked: {
      name: "Stacked Account",
      basePrice: 50,
      pricePerSkin: 3,
      description: "Mix of everything - OG, rare, tryhard",
    },
    vbucks: {
      name: "V-Bucks Ready",
      basePrice: 10,
      pricePerThousandVbucks: 7,
      description: "Fresh account loaded with V-Bucks",
    },
  }

  const valorantOptions = {
    basePrice: 35,
    rankPricing: {
      iron: 0,
      bronze: 5,
      silver: 10,
      gold: 20,
      platinum: 35,
      diamond: 60,
      ascendant: 100,
      immortal: 150,
      radiant: 250,
    },
    skinCollections: {
      prime: { price: 25, name: "Prime Collection" },
      reaver: { price: 30, name: "Reaver Collection" },
      elderflame: { price: 35, name: "Elderflame Collection" },
      glitchpop: { price: 30, name: "Glitchpop Collection" },
    },
    allAgents: { price: 15 },
    battlePass: { price: 10 },
  }

  const r6Options = {
    basePrice: 28,
    rankPricing: {
      copper: 0,
      bronze: 5,
      silver: 10,
      gold: 20,
      platinum: 35,
      diamond: 60,
      champion: 100,
    },
    allOperators: { price: 20 },
    blackIce: { price: 25 },
    eliteUniforms: { price: 15 },
    moddedStats: { price: 18 },
    renownCredits: { pricePerThousand: 2 },
  }

  const calculatePrice = () => {
    let price = 0

    if (gameType === "gta") {
      price = gtaOptions.level.basePrice
      if (config.level && config.level > 1) {
        price += (config.level - 1) * gtaOptions.level.pricePerLevel
      }
      if (config.money) {
        price += config.money * gtaOptions.money.pricePerMillion
      }
      if (config.allProperties) price += gtaOptions.allProperties.price
      if (config.moddedOutfits) price += gtaOptions.moddedOutfits.price
      if (config.fastRun) price += gtaOptions.fastRun.price
      if (config.weaponsResearch) price += gtaOptions.weaponsResearch.price
      if (config.moddedStats) price += gtaOptions.moddedStats.price
    } else if (gameType === "fortnite") {
      if (config.accountType) {
        const accountType = fortniteAccountTypes[config.accountType as keyof typeof fortniteAccountTypes]
        price = accountType.basePrice
        if (config.accountType === "vbucks") {
          if (config.vbucksAmount) {
            price += (config.vbucksAmount / 1000) * accountType.pricePerThousandVbucks
          }
        } else {
          if (config.skinCount) {
            price += config.skinCount * accountType.pricePerSkin
          }
        }
      }
    } else if (gameType === "valorant") {
      price = valorantOptions.basePrice
      if (config.rank) {
        price += valorantOptions.rankPricing[config.rank as keyof typeof valorantOptions.rankPricing] || 0
      }
      Object.entries(config).forEach(([key, value]) => {
        if (value && valorantOptions.skinCollections[key as keyof typeof valorantOptions.skinCollections]) {
          price += valorantOptions.skinCollections[key as keyof typeof valorantOptions.skinCollections].price
        }
      })
      if (config.allAgents) price += valorantOptions.allAgents.price
      if (config.battlePass) price += valorantOptions.battlePass.price
    } else if (gameType === "r6") {
      price = r6Options.basePrice
      if (config.rank) {
        price += r6Options.rankPricing[config.rank as keyof typeof r6Options.rankPricing] || 0
      }
      if (config.allOperators) price += r6Options.allOperators.price
      if (config.blackIce) price += r6Options.blackIce.price
      if (config.eliteUniforms) price += r6Options.eliteUniforms.price
      if (config.moddedStats) price += r6Options.moddedStats.price
      if (config.renownCredits) {
        price += (config.renownCredits / 1000) * r6Options.renownCredits.pricePerThousand
      }
    }

    setTotalPrice(
      Math.max(price, gameType === "gta" ? 25 : gameType === "fortnite" ? 10 : gameType === "valorant" ? 35 : 28),
    )
  }

  const handleConfigChange = (key: string, value: any) => {
    setConfig({ ...config, [key]: value })
  }

  const handleAddToCart = () => {
    const item = {
      name: `Custom ${gameType === "gta" ? "GTA V" : gameType === "fortnite" ? "Fortnite" : gameType === "valorant" ? "Valorant" : "Rainbow Six Siege"} Account`,
      price: totalPrice,
      type: "custom-account",
      config,
      gameType,
    }
    onAddToCart(item)
    onClose()
  }

  const generateOrderId = () => {
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  const handleCheckout = () => {
    const item = {
      name: `Custom ${gameType === "gta" ? "GTA V" : gameType === "fortnite" ? "Fortnite" : gameType === "valorant" ? "Valorant" : "Rainbow Six Siege"} Account`,
      price: totalPrice,
      type: "custom-account",
      config,
      gameType,
    }

    // Generate order ID and prepare payment data
    const orderId = generateOrderId()
    const paymentData = {
      items: [item],
      total: totalPrice,
      customerInfo: {
        name: "Quick Checkout Customer",
        phone: "TBD",
      },
      orderId,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("paymentData", JSON.stringify(paymentData))

    // Open Cash App and redirect to verification
    const cashAppLink = `https://cash.app/$EthanCreel1/${totalPrice.toFixed(2)}`
    window.open(cashAppLink, "_blank")

    setTimeout(() => {
      window.location.href = "/payment-verification"
    }, 1000)
  }

  useEffect(() => {
    calculatePrice()
  }, [config])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                {gameType === "gta"
                  ? "GTA V"
                  : gameType === "fortnite"
                    ? "Fortnite"
                    : gameType === "valorant"
                      ? "Valorant"
                      : "Rainbow Six Siege"}{" "}
                Account Builder
              </CardTitle>
              <CardDescription>Customize your perfect gaming account - No bans guaranteed</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {gameType === "gta" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="level">Character Level (1-8000)</Label>
                <Input
                  id="level"
                  type="number"
                  min="1"
                  max="8000"
                  value={config.level || ""}
                  onChange={(e) => handleConfigChange("level", Number.parseInt(e.target.value) || 1)}
                  placeholder="Enter desired level"
                />
                <p className="text-sm text-gray-500">Base: $25 + $0.01 per level above 1</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="money">Money (Millions)</Label>
                <Input
                  id="money"
                  type="number"
                  min="0"
                  max="2000"
                  value={config.money || ""}
                  onChange={(e) => handleConfigChange("money", Number.parseInt(e.target.value) || 0)}
                  placeholder="Enter millions of dollars"
                />
                <p className="text-sm text-gray-500">$1 per million</p>
              </div>

              <div className="space-y-2">
                <Label>Platform</Label>
                <Select onValueChange={(value) => handleConfigChange("platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pc">PC (Steam/Epic)</SelectItem>
                    <SelectItem value="ps4">PlayStation 4</SelectItem>
                    <SelectItem value="ps5">PlayStation 5</SelectItem>
                    <SelectItem value="xbox-one">Xbox One</SelectItem>
                    <SelectItem value="xbox-series">Xbox Series X/S</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Add-ons</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allProperties"
                    checked={config.allProperties || false}
                    onCheckedChange={(checked) => handleConfigChange("allProperties", checked)}
                  />
                  <Label htmlFor="allProperties" className="flex-1">
                    All Properties (Apartments, Businesses, Bunkers, etc.)
                  </Label>
                  <span className="text-sm text-gray-500">+$15</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="moddedOutfits"
                    checked={config.moddedOutfits || false}
                    onCheckedChange={(checked) => handleConfigChange("moddedOutfits", checked)}
                  />
                  <Label htmlFor="moddedOutfits" className="flex-1">
                    Modded Outfits (Rare & Exclusive Clothing)
                  </Label>
                  <span className="text-sm text-gray-500">+$10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fastRun"
                    checked={config.fastRun || false}
                    onCheckedChange={(checked) => handleConfigChange("fastRun", checked)}
                  />
                  <Label htmlFor="fastRun" className="flex-1">
                    Fast Run (Increased Movement Speed)
                  </Label>
                  <span className="text-sm text-gray-500">+$8</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="weaponsResearch"
                    checked={config.weaponsResearch || false}
                    onCheckedChange={(checked) => handleConfigChange("weaponsResearch", checked)}
                  />
                  <Label htmlFor="weaponsResearch" className="flex-1">
                    All Weapons Research (Unlocked Modifications)
                  </Label>
                  <span className="text-sm text-gray-500">+$12</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="moddedStats"
                    checked={config.moddedStats || false}
                    onCheckedChange={(checked) => handleConfigChange("moddedStats", checked)}
                  />
                  <Label htmlFor="moddedStats" className="flex-1">
                    Modded Stats (High K/D, Win Rate, etc.)
                  </Label>
                  <span className="text-sm text-gray-500">+$20</span>
                </div>
              </div>
            </>
          )}

          {gameType === "fortnite" && (
            <>
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Account Type</Label>
                <RadioGroup
                  value={config.accountType}
                  onValueChange={(value) => handleConfigChange("accountType", value)}
                >
                  {Object.entries(fortniteAccountTypes).map(([key, type]) => (
                    <div key={key} className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value={key} id={key} />
                      <div className="flex-1">
                        <Label htmlFor={key} className="font-semibold">
                          {type.name}
                        </Label>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {key === "vbucks"
                            ? `Base: $${type.basePrice} + $${type.pricePerThousandVbucks}/1k V-Bucks`
                            : `Base: $${type.basePrice} + $${type.pricePerSkin}/skin`}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {config.accountType && config.accountType !== "vbucks" && (
                <div className="space-y-2">
                  <Label htmlFor="skinCount">Number of Skins</Label>
                  <Input
                    id="skinCount"
                    type="number"
                    min="1"
                    max="1000"
                    value={config.skinCount || ""}
                    onChange={(e) => handleConfigChange("skinCount", Number.parseInt(e.target.value) || 0)}
                    placeholder="Enter number of skins"
                  />
                  <p className="text-sm text-gray-500">
                    ${fortniteAccountTypes[config.accountType as keyof typeof fortniteAccountTypes].pricePerSkin} per
                    skin
                  </p>
                </div>
              )}

              {config.accountType === "vbucks" && (
                <div className="space-y-2">
                  <Label htmlFor="vbucksAmount">V-Bucks Amount</Label>
                  <Input
                    id="vbucksAmount"
                    type="number"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={config.vbucksAmount || ""}
                    onChange={(e) => handleConfigChange("vbucksAmount", Number.parseInt(e.target.value) || 0)}
                    placeholder="Enter V-Bucks amount"
                  />
                  <p className="text-sm text-gray-500">$7 per 1,000 V-Bucks</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Platform</Label>
                <Select onValueChange={(value) => handleConfigChange("platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pc">PC (Epic Games)</SelectItem>
                    <SelectItem value="ps4">PlayStation 4</SelectItem>
                    <SelectItem value="ps5">PlayStation 5</SelectItem>
                    <SelectItem value="xbox-one">Xbox One</SelectItem>
                    <SelectItem value="xbox-series">Xbox Series X/S</SelectItem>
                    <SelectItem value="nintendo-switch">Nintendo Switch</SelectItem>
                    <SelectItem value="mobile">Mobile (iOS/Android)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {gameType === "valorant" && (
            <>
              <div className="space-y-2">
                <Label>Rank</Label>
                <Select onValueChange={(value) => handleConfigChange("rank", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select desired rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iron">Iron (+$0)</SelectItem>
                    <SelectItem value="bronze">Bronze (+$5)</SelectItem>
                    <SelectItem value="silver">Silver (+$10)</SelectItem>
                    <SelectItem value="gold">Gold (+$20)</SelectItem>
                    <SelectItem value="platinum">Platinum (+$35)</SelectItem>
                    <SelectItem value="diamond">Diamond (+$60)</SelectItem>
                    <SelectItem value="ascendant">Ascendant (+$100)</SelectItem>
                    <SelectItem value="immortal">Immortal (+$150)</SelectItem>
                    <SelectItem value="radiant">Radiant (+$250)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Skin Collections</Label>
                {Object.entries(valorantOptions.skinCollections).map(([key, collection]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={config[key] || false}
                      onCheckedChange={(checked) => handleConfigChange(key, checked)}
                    />
                    <Label htmlFor={key} className="flex-1">
                      {collection.name}
                    </Label>
                    <span className="text-sm text-gray-500">+${collection.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allAgents"
                    checked={config.allAgents || false}
                    onCheckedChange={(checked) => handleConfigChange("allAgents", checked)}
                  />
                  <Label htmlFor="allAgents" className="flex-1">
                    All Agents Unlocked
                  </Label>
                  <span className="text-sm text-gray-500">+$15</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="battlePass"
                    checked={config.battlePass || false}
                    onCheckedChange={(checked) => handleConfigChange("battlePass", checked)}
                  />
                  <Label htmlFor="battlePass" className="flex-1">
                    Battle Pass Completion
                  </Label>
                  <span className="text-sm text-gray-500">+$10</span>
                </div>
              </div>
            </>
          )}

          {gameType === "r6" && (
            <>
              <div className="space-y-2">
                <Label>Rank</Label>
                <Select onValueChange={(value) => handleConfigChange("rank", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select desired rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copper">Copper (+$0)</SelectItem>
                    <SelectItem value="bronze">Bronze (+$5)</SelectItem>
                    <SelectItem value="silver">Silver (+$10)</SelectItem>
                    <SelectItem value="gold">Gold (+$20)</SelectItem>
                    <SelectItem value="platinum">Platinum (+$35)</SelectItem>
                    <SelectItem value="diamond">Diamond (+$60)</SelectItem>
                    <SelectItem value="champion">Champion (+$100)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="renownCredits">Renown & R6 Credits (in thousands)</Label>
                <Input
                  id="renownCredits"
                  type="number"
                  min="0"
                  max="500"
                  value={config.renownCredits || ""}
                  onChange={(e) => handleConfigChange("renownCredits", Number.parseInt(e.target.value) || 0)}
                  placeholder="Enter amount in thousands"
                />
                <p className="text-sm text-gray-500">$2 per 1,000 credits</p>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Add-ons</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allOperators"
                    checked={config.allOperators || false}
                    onCheckedChange={(checked) => handleConfigChange("allOperators", checked)}
                  />
                  <Label htmlFor="allOperators" className="flex-1">
                    All 65+ Operators Unlocked
                  </Label>
                  <span className="text-sm text-gray-500">+$20</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="blackIce"
                    checked={config.blackIce || false}
                    onCheckedChange={(checked) => handleConfigChange("blackIce", checked)}
                  />
                  <Label htmlFor="blackIce" className="flex-1">
                    Black Ice Skin Collection
                  </Label>
                  <span className="text-sm text-gray-500">+$25</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="eliteUniforms"
                    checked={config.eliteUniforms || false}
                    onCheckedChange={(checked) => handleConfigChange("eliteUniforms", checked)}
                  />
                  <Label htmlFor="eliteUniforms" className="flex-1">
                    Elite Uniforms & Sets
                  </Label>
                  <span className="text-sm text-gray-500">+$15</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="moddedStats"
                    checked={config.moddedStats || false}
                    onCheckedChange={(checked) => handleConfigChange("moddedStats", checked)}
                  />
                  <Label htmlFor="moddedStats" className="flex-1">
                    Modded Stats (K/D, Win Rate, etc.)
                  </Label>
                  <span className="text-sm text-gray-500">+$18</span>
                </div>
              </div>
            </>
          )}

          {/* Price Display */}
          <div className="border-t pt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Price Breakdown:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>
                    $
                    {gameType === "gta"
                      ? "25.00"
                      : gameType === "fortnite"
                        ? config.accountType
                          ? fortniteAccountTypes[config.accountType as keyof typeof fortniteAccountTypes].basePrice +
                            ".00"
                          : "10.00"
                        : gameType === "valorant"
                          ? "35.00"
                          : "28.00"}
                  </span>
                </div>
                {/* Additional pricing details would be shown here based on selections */}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Price:</span>
                  <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddToCart} className="flex-1 bg-gray-600 hover:bg-gray-700">
              Add to Cart
            </Button>
            <Button onClick={handleCheckout} className="flex-1 bg-purple-600 hover:bg-purple-700">
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
