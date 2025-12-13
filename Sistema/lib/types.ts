// Data Models for the Laundry System

export interface Cliente {
  nome: string
  cpf: string
  email: string
  telefone: string
}

export interface Item {
  tipo: string
  servico: string
  preco: number
}

export interface Pedido {
  id: number
  cliente: Cliente
  listaPecas: Item[]
  valorTotal: number
  valorFinal: number
  prazoDias: number
  status: string
  dataCriacao: string
}

export interface Atendente {
  usuario: string
  senha: string
}

export class PedidoClass {
  id: number
  listaPecas: Item[]
  valorTotal: number
  valorFinal: number
  prazoDias: number
  status: string

  constructor(id: number) {
    this.id = id
    this.listaPecas = []
    this.valorTotal = 0
    this.valorFinal = 0
    this.prazoDias = 1
    this.status = "Pendente"
  }

  adicionarPeca(peca: Item): void {
    this.listaPecas.push(peca)
    this.calcularTotal()
    this.calcularDesconto()
    this.calcularPrazoEntrega()
  }

  calcularTotal(): number {
    this.valorTotal = this.listaPecas.reduce((sum, item) => sum + item.preco, 0)
    return this.valorTotal
  }

  calcularDesconto(): number {
    // Business Rule: If order has more than 5 items, apply 10% discount
    if (this.listaPecas.length > 5) {
      const discount = this.valorTotal * 0.1
      this.valorFinal = this.valorTotal - discount
      return discount
    }
    this.valorFinal = this.valorTotal
    return 0
  }

  calcularPrazoEntrega(): number {
    // Business Rule: Base deadline of 1 day + 1 day per item
    this.prazoDias = 1 + this.listaPecas.length
    return this.prazoDias
  }
}
