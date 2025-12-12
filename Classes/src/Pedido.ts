import { Peca } from "./Peca";

export class Pedido {

    public valorTotal: number = 0;
    public prazoDias: number = 0;
    public valorFinal: number = 0;

    constructor(
        public codigo: string,
        public clienteCPF: string,
        public listaPecas: Peca[],
        public status: "pendente" | "concluido" = "pendente"
    ) {}


    //  MÉTODO 1: PRAZO
    public calcularPrazoEntrega(): number {
        let prazo = 0;

        this.listaPecas.forEach(peca => {
            switch (peca.servico) {
                case "lavar": prazo = Math.max(prazo, 1); break;
                case "secar": prazo = Math.max(prazo, 1); break;
                case "passar": prazo = Math.max(prazo, 2); break;
                case "completo": prazo = Math.max(prazo, 4); break;
            }
        });

        this.prazoDias = prazo;
        return prazo;
    }

    //  MÉTODO 2: DESCONTO
    public calcularDesconto(): number {
        this.valorTotal = this.listaPecas.reduce((acc, p) => acc + p.preco, 0);

        const qtd = this.listaPecas.length;

        let desconto = 0;

        if (qtd > 10) {
            desconto = this.valorTotal * 0.20;
        } else if (qtd > 5) {
            desconto = this.valorTotal * 0.10;
        }

        this.valorFinal = this.valorTotal - desconto;
        return desconto;
    }
}
