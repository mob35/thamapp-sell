import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthenService } from "@ngcommerce/core";
import { LoadingProvider } from '../../providers/loading/loading';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: AuthenService,
    public loadingCtrl: LoadingProvider,
    public app: App,
  ) {
    if (this.navParams.data && this.navParams.data !== undefined) {
      this.user.tel = this.navParams.data;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    let newUser = this.user;
    newUser.firstName = this.user.first_name;
    newUser.lastName = this.user.last_name;
    newUser.username = this.user.tel;
    newUser.password = 'Usr#Pass1234';
    // alert(JSON.stringify(newUser));
    this.loadingCtrl.onLoading();
    this.service.signUp(newUser).then(data => {
      window.localStorage.setItem('token',data.loginToken);
      window.localStorage.setItem('thamappseller', JSON.stringify(data));
      // alert(JSON.stringify(data));
      this.loadingCtrl.dismiss();
      this.app.getRootNav().setRoot(TabsPage);
    }).catch(e => {
      this.loadingCtrl.dismiss();
      alert("<pre>" + JSON.stringify(e));
    });
  }

}
