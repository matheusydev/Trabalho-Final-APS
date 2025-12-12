"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const Peca_1 = require("./Peca");
class Pedido {
    codigo;
    clienteCPF;
    listaPecas;
    status;
    valorTotal = 0;
    prazoDias = 0;
    valorFinal = 0;
    constructor(codigo, clienteCPF, listaPecas, status = "pendente") {
        this.codigo = codigo;
        this.clienteCPF = clienteCPF;
        this.listaPecas = listaPecas;
        this.status = status;
    }
    //  MÉTODO 1: PRAZO
    calcularPrazoEntrega() {
        let prazo = 0;
        this.listaPecas.forEach(peca => {
            switch (peca.servico) {
                case "lavar":
                    prazo = Math.max(prazo, 1);
                    break;
                case "secar":
                    prazo = Math.max(prazo, 1);
                    break;
                case "passar":
                    prazo = Math.max(prazo, 2);
                    break;
                case "completo":
                    prazo = Math.max(prazo, 4);
                    break;
            }
        });
        this.prazoDias = prazo;
        return prazo;
    }
    //  MÉTODO 2: DESCONTO
    calcularDesconto() {
        this.valorTotal = this.listaPecas.reduce((acc, p) => acc + p.preco, 0);
        const qtd = this.listaPecas.length;
        let desconto = 0;
        if (qtd > 10) {
            desconto = this.valorTotal * 0.20;
        }
        else if (qtd > 5) {
            desconto = this.valorTotal * 0.10;
        }
        this.valorFinal = this.valorTotal - desconto;
        return desconto;
    }
}
exports.Pedido = Pedido;
