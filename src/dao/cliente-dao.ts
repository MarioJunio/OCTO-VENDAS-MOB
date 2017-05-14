import { Injectable } from '@angular/core';
import { DAO } from './dao';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Cliente } from '../model/cliente';
import { Cidade } from '../model/cidade';
import { Estado } from '../model/estado';
import { CidadeDAO } from './cidade-dao';
import { EstadoDAO } from './estado-dao';

@Injectable()
export class ClienteDAO extends DAO {

    private sqlite: SQLite;
    private tabela: String;
    private colunas: any = {};

    public constructor(public platform: Platform, public estadoDAO: EstadoDAO, public cidadeDAO: CidadeDAO) {
        super();

        this.sqlite = new SQLite();
        this.tabela = 'cliente';
        this.colunas = {
            id: 'id',
            nome: 'nome',
            email: 'email',
            cpf: 'cpf',
            rg: 'rg',
            fone1: 'fone1',
            fone2: 'fone2',
            cep: 'cep',
            bairro: 'bairro',
            logradouro: 'logradouro',
            numero: 'numero',
            complemento: 'complemento',
            cidade_id: 'cidade_id',
            cnpj: 'cnpj',
            inscricao_estadual: 'inscricao_estadual',
            nome_fantasia: 'nome_fantasia',
            razao_social: 'razao_social',
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
        sql += this.colunas.id + ' INTEGER PRIMARY KEY, ';
        sql += this.colunas.nome + ' VARCHAR(100), ';
        sql += this.colunas.email + ' VARCHAR(300), ';
        sql += this.colunas.cpf + ' VARCHAR(20), ';
        sql += this.colunas.rg + ' VARCHAR(20), ';
        sql += this.colunas.fone1 + ' VARCHAR(20), ';
        sql += this.colunas.fone2 + ' VARCHAR (20), ';
        sql += this.colunas.cep + ' VARCHAR(10), ';
        sql += this.colunas.bairro + ' VARCHAR(80), ';
        sql += this.colunas.logradouro + ' VARCHAR(80), ';
        sql += this.colunas.numero + ' INTEGER, ';
        sql += this.colunas.complemento + ' VARCHAR(255), ';
        sql += this.colunas.cidade_id + ' INTEGER, ';
        sql += this.colunas.cnpj + ' VARCHAR(20), ';
        sql += this.colunas.inscricao_estadual + ' VARCHAR(15), ';
        sql += this.colunas.nome_fantasia + ' VARCHAR(100), ';
        sql += this.colunas.razao_social + ' VARCHAR(100), ';
        sql += this.colunas.data_alteracao + ' date, ';
        sql += 'FOREIGN KEY (' + this.colunas.cidade_id + ') REFERENCES cidade(id)';
        sql += ')';

        this.sqlite.executeSql(sql, []).catch(reason => {
            alert('Não foi possível criar a tabela: ' + this.tabela);
        });
    }

    public buscarTodos() {
        let sql = 'select a.*, b.nome as cidade_nome, c.id as estado_id, c.uf as estado_uf, c.nome as estado_nome from ' + this.tabela + ' a ';
        sql += 'join ' + this.cidadeDAO.tabela + ' b on (b.id = a.cidade_id) ';
        sql += 'join ' + this.estadoDAO.tabela + ' c on (c.id = b.estado_id)'
        return this.sqlite.executeSql(sql, []);
    }

    public buscar(id: Number) {
        let sql = 'select * from ' + this.tabela + ' where ' + this.colunas.id + ' = ?';
        return this.sqlite.executeSql(sql, [id]);
    }

    public salvar(cliente: Cliente) {
        let sql = 'insert into ' + this.tabela + ' (' + super.colunasToSQL(this.colunas) + ')' + ' VALUES (' + super.colunasParametrosToSQL(this.colunas) + ')';
        return this.sqlite.executeSql(sql, [cliente.id, cliente.nome, cliente.email, cliente.cpf, cliente.rg, cliente.fone1, cliente.fone2, cliente.cep, cliente.bairro, cliente.logradouro, cliente.numero, cliente.complemento, (cliente.cidade ? cliente.cidade.id : null), cliente.cnpj, cliente.inscricaoEstadual, cliente.nomeFantasia, cliente.razaoSocial, cliente.dataAlteracao]);
    }

    public atualizar(cliente: Cliente) {
        let sql = 'update ' + this.tabela + ' set ' + this.colunas.nome + ' = ?, ' + this.colunas.email + ' = ?, ' + this.colunas.cpf + ' = ?, ' + this.colunas.rg + ' = ?, ' + this.colunas.fone1 + ' = ?, ' + this.colunas.fone2 + ' = ?, ' + this.colunas.cep + ' = ?, ' + this.colunas.bairro + ' = ?, ' + this.colunas.logradouro + ' = ?, ' + this.colunas.numero + ' = ?, ' + this.colunas.complemento + ' = ?, ' + this.colunas.cidade_id + ' = ?, ' + this.colunas.cnpj + ' = ?, ' + this.colunas.inscricao_estadual + ' = ?, ' + this.colunas.nome_fantasia + ' = ?, ' + this.colunas.razao_social + ' = ?, ' + this.colunas.data_alteracao + ' = ? where ' + this.colunas.id + ' = ?';
        return this.sqlite.executeSql(sql, [cliente.nome, cliente.email, cliente.cpf, cliente.rg, cliente.fone1, cliente.fone2, cliente.cep, cliente.bairro, cliente.logradouro, cliente.numero, cliente.complemento, cliente.cidade.id, cliente.cnpj, cliente.inscricaoEstadual, cliente.nomeFantasia, cliente.razaoSocial, cliente.dataAlteracao, cliente.id]);
    }
}
