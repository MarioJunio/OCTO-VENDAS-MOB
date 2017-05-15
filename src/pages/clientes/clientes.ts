import { Component } from '@angular/core';
import { Platform } from 'ionic-angular'
import { NavController } from 'ionic-angular';
import { ClienteDAO } from '../../dao/cliente-dao';
import { Cliente } from '../../model/cliente';
import { Cidade } from '../../model/cidade';
import { Estado } from '../../model/estado';
import { DetalhesClientePage } from '../detalhes-cliente/detalhes-cliente';

@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html'
})

export class ClientesPage {

  public clientes: any[] = [];

  constructor(public platform: Platform, public navCtrl: NavController, public clienteDAO: ClienteDAO) {
  }

  ngOnInit() {

    // aguarda 500ms segundo para buscar os clientes
    setTimeout(() => {

      this.clienteDAO.buscarTodos().then(data => {

        if (data.rows.length > 0) {

          for (let i = 0; i < data.rows.length; i++) {
            let json = data.rows.item(i);

            // cria entidade estado
            let estado = new Estado();
            estado.id = json.estado_id;
            estado.uf = json.estado_uf;
            estado.nome = json.estado_nome;

            // cria entidade cidade
            let cidade = new Cidade();
            cidade.id = json.cidade_id;
            cidade.nome = json.cidade_nome;
            cidade.estado = estado;

            // cria entidade cliente
            let cliente = new Cliente();
            cliente.id = json.id;
            cliente.nome = json.nome;
            cliente.email = json.email;
            cliente.cpf = json.cpf;
            cliente.fone1 = json.fone1;
            cliente.fone2 = json.fone2;
            cliente.cep = json.cep;
            cliente.bairro = json.bairro;
            cliente.logradouro = json.logradouro;
            cliente.numero = json.numero;
            cliente.complemento = json.complemento;
            cliente.cidade = cidade;
            cliente.cnpj = json.cnpj;
            cliente.inscricaoEstadual = json.inscricao_estadual;
            cliente.nomeFantasia = json.nome_fantasia;
            cliente.razaoSocial = json.razao_social;
            cliente.dataAlteracao = json.data_alteracao;

            this.clientes.push(cliente);
          }

        }

      }).catch(error => {
        alert(error);
      });

    }, 100);


  }

  public mostrarDetalhes(cliente: any) {
    
    this.navCtrl.push(DetalhesClientePage, {
      clienteSelecionado: cliente
    });

  }

  public addCliente() {
    //TODO: adicionar novo cliente
    console.log('Chamou add cliente');
  }

}
