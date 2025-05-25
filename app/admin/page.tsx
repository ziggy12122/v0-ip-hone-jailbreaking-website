"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Package, Clock, CheckCircle, X, Send, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Order {
  id: string
  customerName: string
  customerPhone: string
  items: any[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  paymentScreenshot?: string
  createdAt: Date
  deliveredAt?: Date
  accountDetails?: string
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [accountDetails, setAccountDetails] = useState("")
  const [deliveryMessage, setDeliveryMessage] = useState("")

  // Mock orders data - in real app this would come from a database
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        customerName: "John Doe",
        customerPhone: "7656156371",
        items: [
          {
            name: "Custom GTA V Account",
            price: 85,
            config: { level: 500, money: 100, allProperties: true, moddedStats: true },
          },
        ],
        total: 85,
        status: "pending",
        createdAt: new Date("2024-01-15T10:30:00"),
      },
      {
        id: "ORD-002",
        customerName: "Jane Smith",
        customerPhone: "7656156371",
        items: [
          {
            name: "Custom Fortnite Account",
            price: 150,
            config: { accountType: "og", accountPrice: 150, skinCount: 50 },
          },
        ],
        total: 150,
        status: "processing",
        createdAt: new Date("2024-01-15T09:15:00"),
      },
      {
        id: "ORD-003",
        customerName: "Mike Johnson",
        customerPhone: "7656156371",
        items: [
          {
            name: "iPhone Jailbreak Service",
            price: 25,
          },
        ],
        total: 25,
        status: "completed",
        createdAt: new Date("2024-01-14T16:45:00"),
        deliveredAt: new Date("2024-01-15T08:30:00"),
      },
    ]
    setOrders(mockOrders)
  }, [])

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              deliveredAt: status === "completed" ? new Date() : order.deliveredAt,
            }
          : order,
      ),
    )
  }

  const deliverOrder = (orderId: string) => {
    if (!accountDetails.trim()) {
      alert("Please enter account details before delivering")
      return
    }

    // In real app, this would send SMS and email
    console.log(`Delivering order ${orderId}:`, {
      accountDetails,
      deliveryMessage,
    })

    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "completed",
              deliveredAt: new Date(),
              accountDetails,
            }
          : order,
      ),
    )

    // Simulate sending SMS and email
    alert(`Order ${orderId} delivered successfully!\nSMS sent to customer\nEmail sent with account details`)

    setAccountDetails("")
    setDeliveryMessage("")
    setSelectedOrder(null)
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const processingOrders = orders.filter((order) => order.status === "processing")
  const completedOrders = orders.filter((order) => order.status === "completed")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              Back to Site
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Xutix <span className="text-blue-600">Admin</span>
            </h1>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processingOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${completedOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({processingOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>
                          {order.customerName} • {order.customerPhone} • {order.createdAt.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Items:</h4>
                        {order.items.map((item, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between">
                              <span className="font-medium">{item.name}</span>
                              <span>${item.price}</span>
                            </div>
                            {item.config && (
                              <div className="text-sm text-gray-600 mt-1">{JSON.stringify(item.config, null, 2)}</div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total: ${order.total}</span>
                        <div className="space-x-2">
                          <Button variant="outline" onClick={() => updateOrderStatus(order.id, "processing")}>
                            Start Processing
                          </Button>
                          <Button onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="processing">
            <div className="space-y-4">
              {processingOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>
                          {order.customerName} • {order.customerPhone} • {order.createdAt.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Items:</h4>
                        {order.items.map((item, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between">
                              <span className="font-medium">{item.name}</span>
                              <span>${item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total: ${order.total}</span>
                        <Button onClick={() => setSelectedOrder(order)} className="bg-green-600 hover:bg-green-700">
                          <Send className="h-4 w-4 mr-2" />
                          Deliver Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>
                          {order.customerName} • {order.customerPhone} • Delivered:{" "}
                          {order.deliveredAt?.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Items:</h4>
                        {order.items.map((item, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between">
                              <span className="font-medium">{item.name}</span>
                              <span>${item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-lg font-bold">Total: ${order.total}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Order Details - {selectedOrder.id}</CardTitle>
                  <CardDescription>Deliver account to customer</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p>
                    <strong>Name:</strong> {selectedOrder.customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedOrder.customerPhone}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded mb-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                    {item.config && (
                      <div className="text-sm text-gray-600 mt-2">
                        <strong>Configuration:</strong>
                        <pre className="mt-1 text-xs">{JSON.stringify(item.config, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Account Details Input */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accountDetails">Account Details</Label>
                  <Textarea
                    id="accountDetails"
                    value={accountDetails}
                    onChange={(e) => setAccountDetails(e.target.value)}
                    placeholder="Enter account login details, passwords, etc."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryMessage">Delivery Message (Optional)</Label>
                  <Textarea
                    id="deliveryMessage"
                    value={deliveryMessage}
                    onChange={(e) => setDeliveryMessage(e.target.value)}
                    placeholder="Additional message to send with the account"
                    rows={2}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setSelectedOrder(null)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => deliverOrder(selectedOrder.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!accountDetails.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Deliver Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
