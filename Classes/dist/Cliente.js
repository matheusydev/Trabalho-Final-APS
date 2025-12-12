"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    nome;
    cpf;
    email;
    telefone;
    constructor(nome, cpf, email, telefone) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
    }
}
exports.Cliente = Cliente;
