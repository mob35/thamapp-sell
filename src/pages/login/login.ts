import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuthenService, SignupModel } from "@ngcommerce/core";
import { OneSignal } from '@ionic-native/onesignal';
import { TabsPage } from '../tabs/tabs';
import { LoadingProvider } from '../../providers/loading/loading';
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
    public loadingCtrl : LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    
        // window.localStorage.removeItem('shop');
        // window.localStorage.removeItem('jjuserbuyer');
        this.loadingCtrl.onLoading();
        this.authenService.signIn(this.credential).then(data => {
          window.localStorage.setItem('thamappseller', JSON.stringify(data));
    
          if (this.platform.is('cordova')) {
            this.oneSignal.getIds().then((data) => {
              this.authenService.pushNotificationUser({ id: data.userId });
            });
          }
    
          this.loadingCtrl.dismiss();
          this.navCtrl.push(TabsPage);      
          // this.viewCtrl.dismiss();
          
    
          // alert(JSON.stringify(data));
        }).catch(e => {
          this.loadingCtrl.dismiss();
          alert(JSON.parse(e._body).message);
        });
      }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
