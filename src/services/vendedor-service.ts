import { Injectable } from '@angular/core';
import { VendedorDAO } from '../dao/vendedor-dao';
import { Vendedor } from '../model/vendedor';

@Injectable()
export class VendedorService {

    constructor(public vendedorDAO: VendedorDAO) {
    }

    public buscarVendedorAtivo() {
        return this.vendedorDAO.buscarVendedorAtivo();
    }

    public salvar(vendedor: Vendedor, callbackSuccess, callbackError) {
        this.vendedorDAO.salvar(vendedor, callbackSuccess, callbackError);
    }

    public desativarTodosVendedores(callbackSuccess, callbackError) {
        this.vendedorDAO.desativarVendedores(callbackSuccess, callbackError);
    }


}
