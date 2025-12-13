import type { Pedido, Cliente, Atendente } from "./types"
import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const PEDIDOS_FILE = path.join(DATA_DIR, "pedidos.json")
const CLIENTES_FILE = path.join(DATA_DIR, "clientes.json")
const ATENDENTES_FILE = path.join(DATA_DIR, "atendentes.json")

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

// Initialize default data files
async function initializeFiles() {
  await ensureDataDir()

  // Initialize atendentes.json with default credentials
  try {
    await fs.access(ATENDENTES_FILE)
  } catch {
    const defaultAtendentes: Atendente[] = [
      { usuario: "admin", senha: "admin123" },
      { usuario: "atendente1", senha: "senha123" },
    ]
    await fs.writeFile(ATENDENTES_FILE, JSON.stringify(defaultAtendentes, null, 2))
  }

  // Initialize pedidos.json
  try {
    await fs.access(PEDIDOS_FILE)
  } catch {
    await fs.writeFile(PEDIDOS_FILE, JSON.stringify([], null, 2))
  }

  // Initialize clientes.json
  try {
    await fs.access(CLIENTES_FILE)
  } catch {
    await fs.writeFile(CLIENTES_FILE, JSON.stringify([], null, 2))
  }
}

// Load Orders from JSON
export async function loadPedidos(): Promise<Pedido[]> {
  await initializeFiles()
  try {
    const data = await fs.readFile(PEDIDOS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Save Orders to JSON
export async function savePedidos(pedidos: Pedido[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(PEDIDOS_FILE, JSON.stringify(pedidos, null, 2))
}

// Load Clients from JSON
export async function loadClientes(): Promise<Cliente[]> {
  await initializeFiles()
  try {
    const data = await fs.readFile(CLIENTES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Save Clients to JSON
export async function saveClientes(clientes: Cliente[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(CLIENTES_FILE, JSON.stringify(clientes, null, 2))
}

// Load Attendants from JSON
export async function loadAtendentes(): Promise<Atendente[]> {
  await initializeFiles()
  try {
    const data = await fs.readFile(ATENDENTES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Get next order ID
export async function getNextOrderId(): Promise<number> {
  const pedidos = await loadPedidos()
  if (pedidos.length === 0) return 1
  return Math.max(...pedidos.map((p) => p.id)) + 1
}
