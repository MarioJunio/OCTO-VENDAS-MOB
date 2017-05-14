import { Component } from '@angular/core';

export class Vendedor {

    id: number;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    fone1: string;
    fone2: string;
    comissao: number;

    // mobile
    credenciais: string;
    ativo: boolean;

    public constructor(id:number, nome: string, email: string, cpf: string, rg: string, fone1: string, fone2: string, comissao: number, credenciais: string, ativo: boolean) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.rg = rg;
        this.fone1 = fone1;
        this.fone2 = fone2;
        this.comissao = comissao;
        this.credenciais = credenciais;
        this.ativo = ativo;
    }
}