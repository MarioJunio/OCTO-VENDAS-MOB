import { DAO } from './dao';
import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Cidade } from '../model/cidade';

@Injectable()
export class CidadeDAO extends DAO {

  private sqlite: SQLite;
  public tabela: String;
  private colunas: any = {};

  public constructor(platform: Platform) {
    super();

    this.sqlite = new SQLite();
    this.tabela = 'cidade';
    this.colunas = {
      id: 'id',
      nome: 'nome',
      estado_id: 'estado_id'
    };

    platform.ready().then(() => {

      this.sqlite.openDatabase({
        name: this.database,
        location: this.location
      }).then(() => {
        this.iniciar();
      }).catch(reason => {
        alert('Não foi possível abrir o banco de dados');
      });

    }).catch(reason => {
      alert('Não foi possível iniciar a aplicação corretamente: ' + JSON.stringify(reason));
    });
  }

  public iniciar() {

    let sql = 'create table if not exists ' + this.tabela + '(';
    sql += this.colunas.id + ' integer primary key, ';
    sql += this.colunas.nome + ' varchar(80), ';
    sql += this.colunas.estado_id + ' integer, ';
    sql += 'foreign key (' + this.colunas.estado_id + ') references estado(id))';

    this.sqlite.executeSql(sql, []).then(() => {
    }).catch(reason => {
      alert('Não foi possível criar a tabela ' + this.tabela);
    });
  }

  public salvar(cidade: Cidade) {
    let sql = 'insert into ' + this.tabela + ' (' + super.colunasToSQL(this.colunas) + ')' + ' VALUES (' + super.colunasParametrosToSQL(this.colunas) + ')';
    return this.sqlite.executeSql(sql, [cidade.id, cidade.nome, cidade.estado.id]);
}

public atualizar(cidade: Cidade) {
  let sql = 'update ' + this.tabela + ' set ' + this.colunas.nome + ' = ?, ' + this.colunas.estado_id + ' = ? where ' + this.colunas.id + ' = ?';
  return this.sqlite.executeSql(sql, [cidade.nome, cidade.estado.id, cidade.id]);
}

  public buscar(id: Number) {
    let sql = 'select * from ' + this.tabela + ' where ' + this.colunas.id + ' = ?';
    return this.sqlite.executeSql(sql, [id]);
  }

}
