import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenService } from "@ngcommerce/core";
import { LoadingProvider } from '../../providers/loading/loading';

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
    public loadingCtrl: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    let newUser = this.user;
    newUser.firstName = this.user.first_name;
    newUser.lastName = this.user.last_name;

    // alert(JSON.stringify(newUser));
    this.loadingCtrl.onLoading();
    this.service.signUp(newUser).then(data => {
      // alert(JSON.stringify(data));
      this.loadingCtrl.dismiss();
      this.navCtrl.pop();
    }).catch(e => {
      this.loadingCtrl.dismiss();
      alert("<pre>" + JSON.stringify(e));
    });
  }

}
