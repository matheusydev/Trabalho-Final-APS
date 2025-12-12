"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sistema = void 0;
const Cliente_1 = require("./Cliente");
const Pedido_1 = require("./Pedido");
const Peca_1 = require("./Peca");
class Sistema {
    clientes = [];
    pedidos = [];
    // CADASTRAR CLIENTE
    cadastrarCliente(cliente) {
        this.clientes.push(cliente);
    }
    // CADASTRAR PEÇA E CRIAR PEDIDO
    registrarPedido(cpf, pecas) {
        const codigo = this.gerarCodigoPedido();
        const pedido = new Pedido_1.Pedido(codigo, cpf, pecas);
        pedido.calcularPrazoEntrega();
        pedido.calcularDesconto();
        this.pedidos.push(pedido);
        return pedido;
    }
    //  MÉTODO 3: GERAR CÓDIGO
    gerarCodigoPedido() {
        const numero = Date.now().toString().slice(-6);
        return `PED-${numero}`;
    }
    // FINALIZAR PEDIDO
    finalizarPedido(codigo) {
        const pedido = this.pedidos.find(p => p.codigo === codigo && p.status === "pendente");
        if (!pedido)
            return false;
        pedido.status = "concluido";
        return true;
    }
    //  MÉTODO 4: HISTÓRICO DE PEDIDOS
    historicoDePedidos(cpf) {
        return this.pedidos.filter(p => p.clienteCPF === cpf && p.status === "concluido");
    }
}
exports.Sistema = Sistema;
