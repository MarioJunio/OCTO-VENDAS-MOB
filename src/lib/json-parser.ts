import { Injectable } from '@angular/core'
import { Vendedor } from '../model/vendedor';


@Injectable()
export class JsonParser {

    public static parseVendedor(vendedorJson, credenciais: string) {
        return new Vendedor(vendedorJson.id, vendedorJson.nome, vendedorJson.email, vendedorJson.cpf, vendedorJson.rg, vendedorJson.fone1, vendedorJson.fone2, vendedorJson.comissao, credenciais, vendedorJson.ativo);
    }

}