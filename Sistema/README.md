# Sistema de Lavanderia Automatizada

Sistema completo de gestão para lavanderias com controle de pedidos, clientes e regras de negócio automatizadas.

## 📋 Funcionalidades

### 1. Autenticação
- Tela de login com validação de credenciais
- Credenciais padrão: `admin` / `admin123`
- Gerenciamento de atendentes via arquivo JSON

### 2. Gestão de Pedidos
- Cadastro de clientes com nome e telefone
- Adição de múltiplas peças por pedido
- Cálculo automático de valores e prazos
- Persistência em arquivos JSON

### 3. Regras de Negócio Automatizadas

#### Cálculo de Desconto
- **Regra**: Pedidos com mais de 5 peças recebem 10% de desconto
- **Implementação**: Método `calcularDesconto()` da classe `PedidoClass`

#### Cálculo de Prazo de Entrega
- **Regra**: 1 dia base + 1 dia por peça
- **Implementação**: Método `calcularPrazoEntrega()` da classe `PedidoClass`

## 🏗️ Estrutura de Dados

### Classes Principais

#### Cliente
\`\`\`typescript
{
  nome: string
  cpf: string
  email: string
  telefone: string
}
\`\`\`

#### Item (Peça)
\`\`\`typescript
{
  tipo: string      // Ex: "Camisa"
  servico: string   // Ex: "Lavar e Passar"
  preco: number     // Ex: 15.00
}
\`\`\`

#### Pedido
\`\`\`typescript
{
  id: number
  cliente: Cliente
  listaPecas: Item[]
  valorTotal: number
  valorFinal: number     // Com desconto aplicado
  prazoDias: number
  status: string
  dataCriacao: string
}
\`\`\`

#### PedidoClass (Classe com Métodos)
- `adicionarPeca(peca: Item)`: Adiciona uma peça ao pedido
- `calcularTotal()`: Soma os preços de todas as peças
- `calcularDesconto()`: Aplica 10% de desconto se > 5 peças
- `calcularPrazoEntrega()`: Calcula prazo baseado na quantidade

## 💾 Persistência de Dados (JSON)

O sistema utiliza 3 arquivos JSON locais:

### `/data/atendentes.json`
\`\`\`json
[
  { "usuario": "admin", "senha": "admin123" },
  { "usuario": "atendente1", "senha": "senha123" }
]
\`\`\`

### `/data/clientes.json`
\`\`\`json
[
  {
    "nome": "João Silva",
    "cpf": "",
    "email": "",
    "telefone": "(11) 98765-4321"
  }
]
\`\`\`

### `/data/pedidos.json`
\`\`\`json
[
  {
    "id": 1,
    "cliente": {...},
    "listaPecas": [...],
    "valorTotal": 150.00,
    "valorFinal": 135.00,
    "prazoDias": 7,
    "status": "Pendente",
    "dataCriacao": "2025-01-15T10:30:00.000Z"
  }
]
\`\`\`

## 🚀 Como Usar

1. **Login**: Use as credenciais `admin` / `admin123`
2. **Cadastrar Cliente**: Preencha nome e telefone
3. **Adicionar Peças**: Informe tipo, serviço e preço de cada peça
4. **Registrar Pedido**: Clique em "Registrar Pedido" para finalizar

O sistema automaticamente:
- Calcula o total
- Aplica desconto se aplicável
- Define o prazo de entrega
- Salva tudo em JSON

## 🛠️ Tecnologias

- **Frontend**: Next.js 16 + React 19
- **UI**: shadcn/ui + Tailwind CSS v4
- **Persistência**: Sistema de arquivos JSON (Node.js fs/promises)
- **API**: Next.js Route Handlers (App Router)

## 📂 Estrutura de Arquivos

\`\`\`
├── app/
│   ├── page.tsx                    # Página principal (roteamento login/pedido)
│   ├── layout.tsx                  # Layout global
│   ├── globals.css                 # Estilos globais
│   └── api/
│       ├── auth/login/route.ts     # API de autenticação
│       └── orders/route.ts         # API de pedidos (GET/POST)
├── components/
│   ├── login-screen.tsx            # Tela de login
│   ├── order-screen.tsx            # Tela de pedidos
│   └── ui/                         # Componentes shadcn
├── lib/
│   ├── types.ts                    # Definições de tipos e classes
│   └── storage.ts                  # Funções de persistência JSON
└── data/                           # Arquivos JSON (criados automaticamente)
    ├── atendentes.json
    ├── clientes.json
    └── pedidos.json
\`\`\`

## ✨ Diferenciais

- ✅ Interface moderna e responsiva
- ✅ Validação de dados em tempo real
- ✅ Cálculos automáticos de valores e prazos
- ✅ Sistema de desconto progressivo
- ✅ Persistência robusta em JSON
- ✅ Arquitetura escalável e bem organizada
- ✅ TypeScript com tipagem forte
