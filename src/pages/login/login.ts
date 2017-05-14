import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginWebService } from '../../services/login-web-service';
import { VendedorService } from '../../services/vendedor-service';
import { Globals } from '../../global/globals';
import { Vendedor } from '../../model/vendedor';
import { JsonParser } from '../../lib/json-parser';
import { Util } from '../../lib/util';
import { MyApp } from '../../app/app.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public login: any = {};
  public message; messageUsuario; messageSenha: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public loginWebService: LoginWebService, public vendedorService: VendedorService, public globals: Globals) {

    this.login = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.message = null;
  }

  public entrar() {

    let loginForm = this.login.value;

    this.message = '';

    this.loginWebService.doLogin(loginForm.usuario, loginForm.senha, (response) => {

      // desativa todos os outros vendedores cadastrados no dispositivo
      this.vendedorService.desativarTodosVendedores((data) => {

        // converte texto para JSON
        let vendedorJSON = JSON.parse(JSON.stringify(response));

        // credenciais utilizadas na autenticacao
        let credenciais = Util.criarCredencial(loginForm.usuario, loginForm.senha);

        // transforma JSON em objeto vendedor
        let vendedor: Vendedor = JsonParser.parseVendedor(vendedorJSON, credenciais);

        // ativa vendedor
        vendedor.ativo = true;
        vendedor.credenciais = credenciais;

        // salva vendedor no banco local
        this.vendedorService.salvar(vendedor, data => {

          // atribui o vendedor atual ao cache da aplicação
          this.globals.setVendedor(vendedor);

          // Login realizado
          this.navCtrl.setPages([MyApp]);

        }, error => {
          alert('Ocorreu um problema ao tentar realizar a autenticação!');
        });

      }, error => {
        alert('Não foi possível desativar todos os vendedores do dispositivo! ' + error);
      });

    }, (error) => {

      let errorJson = JSON.parse(error.text());

      // Nao autorizado, usuario ou senha incorreto
      if (errorJson.status == '401') {
        this.message = 'Seu usuario e/ou senha é inválido';
      } else if (errorJson.status == '406') {
        // Vendedor não está ativo para usar o mobile
        this.message = 'Esse vendedor está desativado';
      } else if (errorJson.status == '403') {
        // Acesso proibido a esse controlador
        this.message = 'Acesso negado';
      }

    });
  }

  public validar() {

    // json contendo os valores do formulario
    let loginForm = this.login.value;

    if (!loginForm.usuario) {
      this.messageUsuario = 'Usuario deve ser informado';
    } else {
      this.messageUsuario = '';
    }

    if (!loginForm.senha) {
      this.messageSenha = 'Senha deve ser informada';
    } else {
      this.messageSenha = '';
    }

  }
}
