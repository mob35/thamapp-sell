import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuthenService, SignupModel } from "@ngcommerce/core";
import { OneSignal } from '@ionic-native/onesignal';
import { TabsPage } from '../tabs/tabs';
import { LoadingProvider } from '../../providers/loading/loading';
import { ThamappAuthenProvider } from '../../providers/thamapp-authen/thamapp-authen';
import { Dialogs } from '@ionic-native/dialogs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credential: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService: AuthenService,
    public oneSignal: OneSignal,
    public platform: Platform,
    public thamappAuthenService: ThamappAuthenProvider,
    public app: App,
    public loadingCtrl: LoadingProvider,
    public dialogs: Dialogs
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(data) {
    this.loadingCtrl.onLoading();
    this.thamappAuthenService.checkUserByTel(data).then((res) => {
      if (res) {
        let user = {
          username: data,
          password: 'Usr#Pass1234'
        }
        // this.loadingCtrl.onLoading();
        this.authenService.signIn(user).then((data) => {
          window.localStorage.setItem('thamappseller', JSON.stringify(data));
          if (this.platform.is('cordova')) {
            this.oneSignal.getIds().then((data) => {
              this.authenService.pushNotificationUser({ id: data.userId });
            });
          }
          // setTimeout(function () {
          // this.navCtrl.setRoot(TabsPage);
          this.loadingCtrl.dismiss();
          this.app.getRootNav().setRoot(TabsPage);
        }, (error) => {
          this.loadingCtrl.dismiss();
          this.dialogs.alert(JSON.parse(error._body).message, 'Login', 'OK')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e));
          // this.loadingCtrl.dismiss();
        });
      } else {
        this.loadingCtrl.dismiss();
        this.register(data);
      }
    }, (err) => {
      this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(err._body).message, 'Login', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
    });

  }
  // login() {

  //   // window.localStorage.removeItem('shop');
  //   // window.localStorage.removeItem('jjuserbuyer');
  //   this.loadingCtrl.onLoading();
  //   this.authenService.signIn(this.credential).then(data => {
  //     window.localStorage.setItem('thamappseller', JSON.stringify(data));

  //     if (this.platform.is('cordova')) {
  //       this.oneSignal.getIds().then((data) => {
  //         this.authenService.pushNotificationUser({ id: data.userId });
  //       });
  //     }

  //     this.loadingCtrl.dismiss();
  //     this.navCtrl.push(TabsPage);
  //     // this.viewCtrl.dismiss();


  //     // alert(JSON.stringify(data));
  //   }).catch(e => {
  //     this.loadingCtrl.dismiss();
  //     alert(JSON.parse(e._body).message);
  //   });
  // }

  register(data) {
    this.navCtrl.push(RegisterPage,data);
  }

}
