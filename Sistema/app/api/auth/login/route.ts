import { type NextRequest, NextResponse } from "next/server"
import { loadAtendentes } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const atendentes = await loadAtendentes()
    const atendente = atendentes.find((a) => a.usuario === username && a.senha === password)

    if (atendente) {
      return NextResponse.json({ success: true, username: atendente.usuario })
    } else {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 })
  }
}
