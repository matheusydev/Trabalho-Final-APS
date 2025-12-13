"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogOut, Plus, Save, Trash2, Package } from "lucide-react"
import type { Item } from "@/lib/types"

interface OrderScreenProps {
  currentUser: string
  onLogout: () => void
}

export function OrderScreen({ currentUser, onLogout }: OrderScreenProps) {
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientCpf, setClientCpf] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [items, setItems] = useState<Item[]>([])
  const [itemType, setItemType] = useState("")
  const [itemService, setItemService] = useState("")
  const [itemPrice, setItemPrice] = useState("")

  const total = items.reduce((sum, item) => sum + item.preco, 0)
  const discount = items.length > 5 ? total * 0.1 : 0
  const finalValue = total - discount
  const deadline = 1 + items.length

  const handleAddItem = () => {
    if (!itemType || !itemService || !itemPrice) return

    const newItem: Item = {
      tipo: itemType,
      servico: itemService,
      preco: Number.parseFloat(itemPrice),
    }

    setItems([...items, newItem])
    setItemType("")
    setItemService("")
    setItemPrice("")
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleRegisterOrder = async () => {
    if (!clientName || !clientPhone || !clientCpf || items.length === 0) {
      alert("Preencha todos os campos e adicione ao menos uma peça")
      return
    }

    const orderData = {
      clientName,
      clientPhone,
      clientCpf,
      clientEmail,
      items,
      valorTotal: total,
      valorFinal: finalValue,
      prazoDias: deadline,
      discount,
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })

    if (response.ok) {
      alert("Pedido registrado com sucesso!")
      // Clear form
      setClientName("")
      setClientPhone("")
      setClientCpf("")
      setClientEmail("")
      setItems([])
    } else {
      alert("Erro ao registrar pedido")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Sistema de Lavanderia</h1>
              <p className="text-sm text-muted-foreground">Atendente: {currentUser}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Client Info & Add Items */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome do Cliente</Label>
                  <Input
                    id="clientName"
                    placeholder="Nome completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientCpf">CPF</Label>
                  <Input
                    id="clientCpf"
                    placeholder="000.000.000-00"
                    value={clientCpf}
                    onChange={(e) => setClientCpf(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Telefone</Label>
                  <Input
                    id="clientPhone"
                    placeholder="(00) 00000-0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">E-mail</Label>
                  <Input
                    id="clientEmail"
                    type="email" 
                    placeholder="exemplo@email.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Item */}
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Peça</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemType">Tipo</Label>
                    <Input
                      id="itemType"
                      placeholder="Ex: Camisa"
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemService">Serviço</Label>
                    <Input
                      id="itemService"
                      placeholder="Ex: Lavar e Passar"
                      value={itemService}
                      onChange={(e) => setItemService(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemPrice">Preço (R$)</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddItem} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Peça
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Items List & Summary */}
          <div className="space-y-6">
            {/* Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Peças do Pedido ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Nenhuma peça adicionada ainda</p>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Serviço</TableHead>
                          <TableHead className="text-right">Preço</TableHead>
                          <TableHead className="w-[60px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.tipo}</TableCell>
                            <TableCell>{item.servico}</TableCell>
                            <TableCell className="text-right">R$ {item.preco.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">R$ {total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-base text-green-600 dark:text-green-400">
                    <span>Desconto (10%):</span>
                    <span className="font-semibold">- R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-3 border-t">
                  <span>Total:</span>
                  <span>R$ {finalValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-muted-foreground">Prazo de Entrega:</span>
                  <span className="font-semibold">
                    {deadline} {deadline === 1 ? "dia" : "dias"}
                  </span>
                </div>
                <Button
                  onClick={handleRegisterOrder}
                  className="w-full mt-4 h-12 text-base"
                  disabled={items.length === 0 || !clientName || !clientPhone}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Registrar Pedido
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
