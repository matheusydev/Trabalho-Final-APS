export class Peca {
    constructor(
        public tipo: string,
        public servico: "lavar" | "secar" | "passar" | "completo",
        public preco: number
    ) {}
}
