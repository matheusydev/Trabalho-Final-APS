import { Cliente } from "./Cliente";
import { Pedido } from "./Pedido";
import { Peca } from "./Peca";

export class Sistema {

    private clientes: Cliente[] = [];
    private pedidos: Pedido[] = [];

    // CADASTRAR CLIENTE
    public cadastrarCliente(cliente: Cliente) {
        this.clientes.push(cliente);
    }

    // CADASTRAR PEÇA E CRIAR PEDIDO
    public registrarPedido(cpf: string, pecas: Peca[]): Pedido {
        const codigo = this.gerarCodigoPedido();

        const pedido = new Pedido(codigo, cpf, pecas);

        pedido.calcularPrazoEntrega();
        pedido.calcularDesconto();

        this.pedidos.push(pedido);
        return pedido;
    }


    //  MÉTODO 3: GERAR CÓDIGO
    public gerarCodigoPedido(): string {
        const numero = Date.now().toString().slice(-6);
        return `PED-${numero}`;
    }

    // FINALIZAR PEDIDO
    public finalizarPedido(codigo: string): boolean {
        const pedido = this.pedidos.find(p => p.codigo === codigo && p.status === "pendente");

        if (!pedido) return false;

        pedido.status = "concluido";
        return true;
    }

    //  MÉTODO 4: HISTÓRICO DE PEDIDOS
    public historicoDePedidos(cpf: string): Pedido[] {
        return this.pedidos.filter(p => p.clienteCPF === cpf && p.status === "concluido");
    }
}
