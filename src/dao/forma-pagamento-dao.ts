import { Injectable } from '@angular/core';
import { DAO } from './dao';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { FormaPagamento } from '../model/forma-pagamento';

@Injectable()
export class FormaPagamentoDAO extends DAO {

    private sqlite: SQLite;
    private tabela: String;
    private colunas: any = {};

    public constructor(public platform: Platform) {
        super();

        this.sqlite = new SQLite();
        this.tabela = 'forma_pagamento';
        this.colunas = {
            id: 'id',
            tipo_pagamento: 'tipo_pagamento',
            descricao: 'descricao',
            numero_max_parcelas: 'numero_max_parcelas',
            cheque_pre_datado: 'cheque_pre_datado',
            prazo: 'prazo',
            entrada: 'entrada',
            data_alteracao: 'data_alteracao'
        };

        this.platform.ready().then(() => {

            this.sqlite.openDatabase({
                name: this.database,
                location: this.location
            }).then(() => {
                this.iniciar();
            }).catch(reason => {
                alert('Houve um problema ao iniciar o banco de dados: ' + JSON.stringify(reason));
            });

        });
    }

    public iniciar() {

        let sql = '';
        sql += 'CREATE TABLE IF NOT EXISTS ' + this.tabela + '(';
        sql += this.colunas.id + ' INTEGER PRIMARY KEY,';
        sql += this.colunas.tipo_pagamento + ' VARCHAR(255), ';
        sql += this.colunas.descricao + ' VARCHAR(255),';
        sql += this.colunas.numero_max_parcelas + ' INTEGER,';
        sql += this.colunas.cheque_pre_datado + ' BOOLEAN,';
        sql += this.colunas.prazo + ' INTEGER,';
        sql += this.colunas.entrada + ' BOOLEAN,';
        sql += this.colunas.data_alteracao + ' DATE';
        sql += ')';

        this.sqlite.executeSql(sql, []).catch(reason => {
            alert('Não foi possível criar a tabela: ' + this.tabela);
        });
    }

    public buscar(id: Number) {
        let sql = 'select * from ' + this.tabela + ' where ' + this.colunas.id + ' = ?';
        return this.sqlite.executeSql(sql, [id]);
    }

    public salvar(formaPagamento: FormaPagamento) {
        let sql = 'insert into ' + this.tabela + ' (' + super.colunasToSQL(this.colunas) + ')' + ' VALUES (' + super.colunasParametrosToSQL(this.colunas) + ')';
        return this.sqlite.executeSql(sql, [formaPagamento.id, formaPagamento.tipoPagamento, formaPagamento.descricao, formaPagamento.numeroMaxParcelas, formaPagamento.chequePreDatado, formaPagamento.prazo, formaPagamento.entrada, formaPagamento.dataAlteracao]);
    }

    public alterar(formaPagamento: FormaPagamento) {
        let sql = 'update ' + this.tabela + ' set ' + this.colunas.tipo_pagamento + ' = ?, ' + this.colunas.descricao + ' = ?, ' + this.colunas.numero_max_parcelas + ' = ?, ' + this.colunas.cheque_pre_datado + ' = ?, ' + this.colunas.prazo + ' = ?, ' + this.colunas.entrada + ' = ?, ' + this.colunas.dataAlteracao + ' = ? where ' + this.colunas.id + ' = ?';
        return this.sqlite.executeSql(sql, [formaPagamento.tipoPagamento, formaPagamento.descricao, formaPagamento.numeroMaxParcelas, formaPagamento.chequePreDatado, formaPagamento.prazo, formaPagamento.entrada, formaPagamento.dataAlteracao, formaPagamento.id]);
    }

}
