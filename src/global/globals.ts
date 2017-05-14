import {Injectable} from '@angular/core';
import { Vendedor } from '../model/vendedor';

@Injectable()
export class Globals {

    private vendedor: Vendedor;
    private credenciais: string;

    constructor() {
    }

    public setVendedor(vendedor: Vendedor) {
        this.vendedor = vendedor;
    }

    public getVendedor() {
        return this.vendedor;
    }

    public setCredenciais(credenciais: string) {
        this.credenciais = credenciais;
    }

    public getCredenciais(): string {
        return this.credenciais;
    }

}