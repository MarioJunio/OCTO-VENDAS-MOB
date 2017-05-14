import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ParametroSistemaDao } from '../../../dao/parametro-sistema-dao';
import { AppParametros } from '../../../configuracoes/parametros-app';
import { Util } from '../../../lib/util';

@Component({
  selector: 'page-editar-parametro',
  templateUrl: 'editar-parametro.html'
})

export class EditarParametroPage {

  public appParametros;

  public parametro;
  public valor;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public parametroDao: ParametroSistemaDao) {
    this.appParametros = AppParametros.tiposParametro;
    this.parametro = navParams.get('parametro');

    // SE O TIPO DO PARAMETRO = DATA
    if (this.parametro.tipo == AppParametros.tiposParametro.data)
      this.valor = Util.formataData(this.parametro.valor);
    else
      this.valor = this.parametro.valor;

  }

  ngOnInit() {
  }

  public salvar() {

    // verifica qual é o tipo do parâmetro que vai ser atualizado, para converter o valor
    if (this.parametro.tipo == AppParametros.tiposParametro.data)
      this.parametro.valor = Util.getMillisegundos(this.valor);
    else
      this.parametro.valor = this.valor;

    // atualiza o valor do parâmetro editado
    this.parametroDao.atualizar(this.parametro.id, this.parametro.valor).then(() => {

      this.toastCtrl.create({
        message: 'Parâmetro salvo com sucesso.',
        duration: 3000
      }).present();

      this.navCtrl.pop();

    }).catch(error => {

      this.toastCtrl.create({
        message: 'Não foi possível salvar o parâmetro: ' + JSON.stringify(error),
        duration: 3000
      }).present();

    });

  }

}
