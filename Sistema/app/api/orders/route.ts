import { type NextRequest, NextResponse } from "next/server"
import { loadPedidos, savePedidos, loadClientes, saveClientes, getNextOrderId } from "@/lib/storage"
import type { Pedido } from "@/lib/types"

export async function GET() {
  try {
    const pedidos = await loadPedidos()
    return NextResponse.json(pedidos)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar pedidos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientPhone, clientCpf, clientEmail, items, valorTotal, valorFinal, prazoDias, discount } = await request.json()

    // Load existing data
    const pedidos = await loadPedidos()
    const clientes = await loadClientes()

    // Find or create client
    let cliente = clientes.find((c) => c.telefone === clientPhone)
    if (!cliente) {
      cliente = {
        nome: clientName,
        cpf: clientCpf || "",
        email: clientEmail || "",
        telefone: clientPhone,
      }
      clientes.push(cliente)
      await saveClientes(clientes)
    } else {
        // Opcional: Se o cliente já existe, você pode querer atualizar o CPF dele
        if (clientCpf && cliente.cpf !== clientCpf) {
            cliente.cpf = clientCpf;
            await saveClientes(clientes);
        }
    }

    // Create new order
    const newOrder: Pedido = {
      id: await getNextOrderId(),
      cliente,
      listaPecas: items,
      valorTotal,
      valorFinal,
      prazoDias,
      status: "Pendente",
      dataCriacao: new Date().toISOString(),
    }

    pedidos.push(newOrder)
    await savePedidos(pedidos)

    return NextResponse.json({ success: true, order: newOrder })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 })
  }
}
