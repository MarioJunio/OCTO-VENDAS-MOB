import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { DAO } from './dao';

@Injectable()
export class VendedorDAO extends DAO {

    private sqlite: SQLite;
    public tabela: string;
    public colunas: any;

    constructor(public platform: Platform) {
        super();

        this.sqlite = new SQLite();

        this.tabela = 'vendedor';
        this.colunas = {
            id: 'id',
            nome: 'nome',
            email: 'email',
            cpf: 'cpf',
            rg: 'rg',
            fone1: 'fone1',
            fone2: 'fone2',
            comissao: 'comissao',
            credenciais: 'credenciais',
            ativo: 'ativo'
        };

        this.platform.ready().then(() => {

            this.sqlite.openDatabase({
                name: this.database,
                location: this.location
            }).then(() => {
                this.criarTabela();
            }).catch(reason => {
                alert('Não foi possível abrir o banco de dados: ' + JSON.stringify(reason));
            });

        });
    }

    public criarTabela() {

        let sql = 'CREATE TABLE IF NOT EXISTS ' + this.tabela + '(';
        sql += this.colunas.id + ' integer primary key, ';
        sql += this.colunas.nome + ' varchar(100),';
        sql += this.colunas.email + ' varchar(300),';
        sql += this.colunas.cpf + ' varchar(20),';
        sql += this.colunas.rg + ' varchar(20),';
        sql += this.colunas.fone1 + ' varchar(20),';
        sql += this.colunas.fone2 + ' varchar(20),';
        sql += this.colunas.comissao + ' decimal(10,2),';
        sql += this.colunas.credenciais + ' varchar(50),';
        sql += this.colunas.ativo + ' boolean';
        sql += ')';

        this.sqlite.executeSql(sql, []).then(() => {
            // Tabela criada
        }).catch(reason => {
            alert('Erro ao criar tabela: ' + JSON.stringify(reason));
        });
    }

    public salvar(vendedor, callbackSuccess, callbackError) {

        // se não tem código, então será necessário inserir o vendedor do dispositivo
        if (vendedor.id == null) {
            this.inserir(vendedor, callbackSuccess, callbackError);
        } else {

            let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.id + ' = ?';

            // verifica se o vendedor já está cadastrado no dispositivo
            this.sqlite.executeSql(sql, [vendedor.id]).then(data => {

                if (data.rows.length > 0)
                    this.editar(vendedor, callbackSuccess, callbackError);
                else
                    this.inserir(vendedor, callbackSuccess, callbackError);

            }).catch(reason => {
                callbackError(reason);
            });
        }
    }

    public desativarVendedores(callbackSuccess, callbackError) {

        let sql = 'UPDATE ' + this.tabela + ' SET ' + this.colunas.ativo + ' = ?';

        this.sqlite.executeSql(sql, [true]).then(data => {
            callbackSuccess(data);
        }, error => {
            callbackError(error);
        });
    }

    private inserir(vendedor, callbackSuccess, callbackError) {

        let sql = 'INSERT INTO ' + this.tabela + ' (' + this.colunasToSQL(this.colunas) + ') VALUES (' + this.colunasParametrosToSQL(this.colunas) + ')';

        this.sqlite.executeSql(sql, [vendedor.id, vendedor.nome, vendedor.email, vendedor.cpf, vendedor.rg, vendedor.fone1, vendedor.fone2, vendedor.comissao, vendedor.credenciais, vendedor.ativo]).then(data => {
            callbackSuccess(data);
        }).catch(reason => {
            callbackError(reason);
        });

    }

    private editar(vendedor, callbackSuccess, callbackError) {

        let sql = 'UPDATE ' + this.tabela + ' SET ' + this.colunas.nome + ' = ?, ';
        sql += this.colunas.email + ' = ?, ';
        sql += this.colunas.cpf + ' = ?, ';
        sql += this.colunas.rg + ' = ?, ';
        sql += this.colunas.fone1 + ' = ?, ';
        sql += this.colunas.fone2 + ' = ?, ';
        sql += this.colunas.comissao + ' = ?, ';
        sql += this.colunas.ativo + ' = ? ';
        sql += 'WHERE ' + this.colunas.id + ' = ?';

        this.sqlite.executeSql(sql, [vendedor.nome, vendedor.email, vendedor.cpf, vendedor.rg, vendedor.fone1, vendedor.fone2, vendedor.comissao, vendedor.ativo, vendedor.id]).then(data => {
            callbackSuccess(data);
        }).catch(reason => {
            callbackError(reason);
        });

    }

    public buscarVendedorAtivo() {

        let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.ativo + ' = ?';

        return this.sqlite.executeSql(sql, [true]);
    }

    public buscarVendedor(codigo, callbackSuccess, callbackError) {

        let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.id + ' = ?';

        this.sqlite.executeSql(sql, [codigo]).then(data => {

            let vendedor = null;

            if (data.rows.length > 0)
                vendedor = data.rows.item(0);

            callbackSuccess(vendedor);

        }).catch(reason => {
            callbackError(reason);
        });
    }
}
