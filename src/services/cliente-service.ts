import { Injectable } from '@angular/core';
import { ClienteDAO } from '../dao/cliente-dao'
import { EstadoDAO } from '../dao/estado-dao';
import { CidadeDAO } from '../dao/cidade-dao';
import { Cliente } from '../model/cliente';
import { Cidade } from '../model/cidade';
import { Estado } from '../model/estado';

@Injectable()
export class ClienteService {

  public constructor(public clienteDAO: ClienteDAO, public cidadeDAO: CidadeDAO, public estadoDAO: EstadoDAO) { }

  public salvar(cliente: any) {

    // verifica se o cliente já está cadastrado
    this.clienteDAO.buscar(cliente.id).then(data => {

      if (data.rows.length > 0) {
        this.alterar(cliente);
      } else {
        this.inserir(cliente);
      }

    }).catch(error => {
      alert('Não foi possível buscar o cliente de código: ' + cliente.id);
    });

  }

  private inserir(cliente: any) {

    // verifica se o cliente tem endereco
    if (cliente.endereco) {

      // verifica se o endereco tem cidade
      if (cliente.endereco.cidade) {

        // busca a cidade pelo código
        this.cidadeDAO.buscar(cliente.endereco.cidade.id).then(data => {

          // verifica se a cidade não existi
          if (data.rows.length <= 0) {

            // verifica se a cidade possui estado
            if (cliente.endereco.cidade.estado) {

              // verifica se o estado da cidade, já existi no repositorio
              this.estadoDAO.buscarPorUF(cliente.endereco.cidade.estado.uf).then(data => {

                // verifica se o estado não foi encontrado
                if (data.rows.length <= 0) {

                  this.salvarEstado(cliente.endereco.cidade.estado).then(() => {

                    this.salvarCidade(cliente.endereco.cidade).then(() => {

                      // salvar cliente
                      this.salvarCliente(cliente).catch(error => {
                        alert('Não foi possível salvar o cliente: ' + cliente.id);
                      });

                    }).catch(error => {
                      alert('Não foi possível cidade a cidade 1 ' + error);
                    });

                  }).catch(error => {
                    alert('Não foi possível salvar o estado: ' + cliente.endereco.cidade.estado.uf);
                  });

                } else {

                  this.salvarCidade(cliente.endereco.cidade).then(() => {

                    // salvar cliente
                    this.salvarCliente(cliente).catch(error => {
                      alert('Não foi possível salvar o cliente: ' + cliente.id);
                    });

                  }).catch(error => {
                    alert('Não foi possível salvar a cidade 2 ' + error);
                  });

                }

              }).catch(error => {
                alert('Não foi possível buscar o estado: ' + cliente.endereco.cidade.estado.uf);
              });

            } else {

              // salva cidade sem estado dela
              this.salvarCidade(cliente.endereco.cidade).then(() => {

                // salvar cliente
                this.salvarCliente(cliente).catch(error => {
                  alert('Não foi possível salvar o cliente: ' + cliente.id);
                });

              }).catch(error => {
                alert('Não foi possível salvar a cidade 3 ' + error);
              });
            }

          } else { // cidade já foi cadastrada

            // salvar o cliente
            this.salvarCliente(cliente).catch(error => {
              alert('Não foi possível salvar o cliente: ' + cliente.id);
            });

          }

        }).catch(error => {
          alert('Não foi possível buscar a cidade: ' + cliente.endereco.cidade.id);
        });

      }

    }

  }

  private alterar(cliente: any) {

    if (cliente.endereco) {

      // verifica se o endereco tem cidade
      if (cliente.endereco.cidade) {

        // busca a cidade pelo código
        this.cidadeDAO.buscar(cliente.endereco.cidade.id).then(data => {

          // verifica se a cidade não existi
          if (data.rows.length <= 0) {

            // verifica se a cidade possui estado
            if (cliente.endereco.cidade.estado) {

              // verifica se o estado da cidade, já existi no repositorio
              this.estadoDAO.buscarPorUF(cliente.endereco.cidade.estado.uf).then(data => {

                // verifica se o estado não foi encontrado
                if (data.rows.length <= 0) {

                  this.salvarEstado(cliente.endereco.cidade.estado).then(() => {

                    this.salvarCidade(cliente.endereco.cidade).then(() => {

                      // salvar cliente
                      this.atualizarCliente(cliente).catch(error => {
                        alert('Não foi possível atualizar o cliente: ' + cliente.id);
                      });

                    }).catch(error => {
                      alert('Não foi possível cidade a cidade 1 ' + error);
                    });

                  }).catch(error => {
                    alert('Não foi possível salvar o estado: ' + cliente.endereco.cidade.estado.uf);
                  });

                } else {

                  this.salvarCidade(cliente.endereco.cidade).then(() => {

                    // salvar cliente
                    this.atualizarCliente(cliente).catch(error => {
                      alert('Não foi possível atualizar o cliente: ' + cliente.id);
                    });

                  }).catch(error => {
                    alert('Não foi possível salvar a cidade: ' + error);
                  });

                }

              }).catch(error => {
                alert('Não foi possível buscar o estado: ' + cliente.endereco.cidade.estado.uf);
              });

            } else {

              // salva cidade sem estado dela
              this.salvarCidade(cliente.endereco.cidade).then(() => {

                // altera o cliente
                this.atualizarCliente(cliente).catch(error => {
                  alert('Não foi possível atualizar o cliente: ' + cliente.id);
                });

              }).catch(error => {
                alert('Não foi possível salvar a cidade 3 ' + error);
              });
            }

          } else { // cidade já foi cadastrada

            this.atualizarCliente(cliente).catch(error => {
              alert('Não foi possível atualizar o cliente: ' + cliente.id);
            });

          }

        }).catch(error => {
          alert('Não foi possível buscar a cidade: ' + cliente.endereco.cidade.id);
        });

      }

    }

  }

  private salvarEstado(estadoJSON: any) {

    // cria entidade estado
    let estado = new Estado();
    estado.id = estadoJSON.id;
    estado.uf = estadoJSON.uf;

    // salva o estado
    return this.estadoDAO.salvar(estado);
  }

  private atualizarEstado(estadoJSON: any) {

    let estado = new Estado();
    estado.id = estadoJSON.id;
    estado.uf = estadoJSON.uf;

    return this.estadoDAO.atualizar(estado);
  }

  private salvarCidade(cidadeJSON: any) {

    // salva a cidade
    let cidade = new Cidade();
    cidade.id = cidadeJSON.id;
    cidade.nome = cidadeJSON.nome;
    cidade.estado = cidadeJSON.estado;

    // salva a cidade do cliente
    return this.cidadeDAO.salvar(cidade);

  }

  private atualizarCidade(cidadeJSON: any) {

    // salva a cidade
    let cidade = new Cidade();
    cidade.id = cidadeJSON.id;
    cidade.nome = cidadeJSON.nome;
    cidade.estado = cidadeJSON.estado;

    // salva a cidade do cliente
    return this.cidadeDAO.atualizar(cidade);

  }

  private salvarCliente(clienteJSON: any) {

    let cliente: Cliente = new Cliente();
    cliente.id = clienteJSON.id;
    cliente.nome = clienteJSON.nome;
    cliente.email = clienteJSON.email;
    cliente.cpf = clienteJSON.cpf;
    cliente.rg = clienteJSON.rg;
    cliente.fone1 = clienteJSON.fone1;
    cliente.fone2 = clienteJSON.fone2;

    // verifica se o cliente possui endereco
    if (clienteJSON.endereco) {
      cliente.cep = clienteJSON.endereco.cep;
      cliente.bairro = clienteJSON.endereco.bairro;
      cliente.logradouro = clienteJSON.endereco.logradouro;
      cliente.numero = clienteJSON.endereco.numero;
      cliente.complemento = clienteJSON.endereco.complemento;
      cliente.cidade = clienteJSON.endereco.cidade;
    }

    cliente.cnpj = clienteJSON.cnpj;
    cliente.inscricaoEstadual = clienteJSON.inscricaoEstadual;
    cliente.nomeFantasia = clienteJSON.nomeFantasia;
    cliente.razaoSocial = clienteJSON.razaoSocial;
    cliente.dataAlteracao = clienteJSON.dataAlteracao;

    return this.clienteDAO.salvar(cliente);
  }

  private atualizarCliente(clienteJSON: any) {

    let cliente: Cliente = new Cliente();
    cliente.id = clienteJSON.id;
    cliente.nome = clienteJSON.nome;
    cliente.email = clienteJSON.email;
    cliente.cpf = clienteJSON.cpf;
    cliente.rg = clienteJSON.rg;
    cliente.fone1 = clienteJSON.fone1;
    cliente.fone2 = clienteJSON.fone2;

    // verifica se o cliente possui endereco
    if (clienteJSON.endereco) {
      cliente.cep = clienteJSON.endereco.cep;
      cliente.bairro = clienteJSON.endereco.bairro;
      cliente.logradouro = clienteJSON.endereco.logradouro;
      cliente.numero = clienteJSON.endereco.numero;
      cliente.complemento = clienteJSON.endereco.complemento;
      cliente.cidade = clienteJSON.endereco.cidade;
    }

    cliente.cnpj = clienteJSON.cnpj;
    cliente.inscricaoEstadual = clienteJSON.inscricaoEstadual;
    cliente.nomeFantasia = clienteJSON.nomeFantasia;
    cliente.razaoSocial = clienteJSON.razaoSocial;
    cliente.dataAlteracao = clienteJSON.dataAlteracao;

    return this.clienteDAO.atualizar(cliente);
  }

  private falhaSalvarCidade(error) {
    alert('Não foi possível salvar a cidade');
  }

}
