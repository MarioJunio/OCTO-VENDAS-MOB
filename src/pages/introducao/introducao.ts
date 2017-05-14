import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-introducao',
  templateUrl: 'introducao.html'
})

export class IntroducaoPage {

  constructor(public navCtrl: NavController) { }
  
  public telaValidacao() {
    this.navCtrl.push(LoginPage);
  }

}
