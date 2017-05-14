import { DAO } from './dao';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { Injectable } from '@angular/core';
import { Estado } from '../model/estado';

@Injectable()
export class EstadoDAO extends DAO {

    private sqlite: SQLite;
    public tabela: String;
    private colunas: any = {};

    public constructor(platform: Platform) {
        super();

        this.sqlite = new SQLite();
        this.tabela = 'estado';
        this.colunas = {
            id: 'id',
            uf: 'uf',
            nome: 'nome'
        };

        platform.ready().then(() => {

            this.sqlite.openDatabase({
                name: this.database,
                location: this.location
            }).then(() => {
                this.iniciar();
            }).catch(reason => {
                alert('Não foi possível abrir o banco de dados ao iniciar os ' + this.tabela + 's');
            });

        });
    }

    public iniciar() {

        let sql = 'create table if not exists ' + this.tabela + '(';
        sql += this.colunas.id + ' integer primary key, ';
        sql += this.colunas.uf + ' varchar(2), ';
        sql += this.colunas.nome + ' varchar(80))';

        this.sqlite.executeSql(sql, []).catch(reason => {
            alert('Não foi possível criar a tabela ' + this.tabela);
        });
    }

    public salvar(estado: Estado) {
        let sql = 'insert into ' + this.tabela + '(id, uf, nome) values (?, ?, ?)';
        return this.sqlite.executeSql(sql, [estado.id, estado.uf, estado.nome]);
    }

    public atualizar(estado: Estado) {
        let sql = 'update ' + this.tabela + ' set ' + this.colunas.uf + ' = ?, ' + this.colunas.nome + ' = ? where ' + this.colunas.id + ' = ?';
        return this.sqlite.executeSql(sql, [estado.uf, estado.nome, estado.id]);
    }

    public buscarPorCodigo(id: Number) {

        let sql = 'select * from ' + this.tabela + ' where ' + this.colunas.id + ' = ?';

        return this.sqlite.executeSql(sql, [id]);
    }

    public buscarPorUF(uf: String) {

        let sql = 'select * from ' + this.tabela + ' where ' + this.colunas.uf + ' = ?';

        return this.sqlite.executeSql(sql, [uf]);
    }

}
