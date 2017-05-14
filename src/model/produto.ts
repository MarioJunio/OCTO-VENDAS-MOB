import { Marca } from './marca';
import { Categoria } from './categoria';
import { Prateleira } from './prateleira';

export class Produto {

  public id: number;
  public nome: string;
  public marca: Marca;
  public categoria: Categoria;
  public ncm: string;
  public dataCadastro: Date;
  public descricao: string;
  public prateleira: Prateleira;
  public unidade: string;
  public quantidade: number;
  public estoque: number;
  public valor: number;
  public ean: number;
  public finalidade: string;
  public complemento: string;
  public ignorarQuantidade: boolean;
  public dataAlteracao: Date;

  public constructor(id: number, nome: string, marca: Marca, categoria: Categoria, ncm: string, dataCadastro: Date,
    descricao: string, prateleira: Prateleira, unidade: string, quantidade: number, estoque: number, valor: number, ean: number,
    finalidade: string, complemento: string, ignorarQuantidade: boolean, dataAlteracao: Date) {
      this.id = id;
      this.nome = nome;
      this.marca = marca;
      this.categoria = categoria;
      this.ncm = ncm;
      this.dataCadastro = dataCadastro;
      this.descricao = descricao;
      this.prateleira = prateleira;
      this.unidade = unidade;
      this.quantidade = quantidade;
      this.estoque = estoque;
      this.valor = valor;
      this.ean = ean;
      this.finalidade = finalidade;
      this.complemento = complemento;
      this.ignorarQuantidade = ignorarQuantidade;
      this.dataAlteracao = dataAlteracao;
  }

}
