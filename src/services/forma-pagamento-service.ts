import { Injectable } from '@angular/core';
import { FormaPagamento } from '../model/forma-pagamento';
import { FormaPagamentoDAO } from '../dao/forma-pagamento-dao';

@Injectable()
export class FormaPagamentoService {

    public constructor(public formaPagamentoDAO: FormaPagamentoDAO) {
    }

    public salvar(formaPagamento: FormaPagamento) {

        this.formaPagamentoDAO.buscar(formaPagamento.id).then(data => {

            // se > 0, então a forma de pagamento, já está cadastrada
            if (data.rows.length > 0) {
                this.atualizar(formaPagamento);
            } else {
                this.inserir(formaPagamento);
            }

        }).catch(reason => {
            alert('Não foi possível buscar a forma de pagamento de código: ' + formaPagamento.id);
        });

    }

    private inserir(formaPagamento: FormaPagamento) {
        this.formaPagamentoDAO.salvar(formaPagamento);
    }

    private atualizar(formaPagamento: FormaPagamento) {
        this.formaPagamentoDAO.alterar(formaPagamento);
    }
    
}