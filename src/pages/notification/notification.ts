import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, App, LoadingController } from 'ionic-angular';
import { ShopModel } from '@ngcommerce/core';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  shop = {} as ShopModel;
  notifications: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingProvider,
    // public loadingCtrl: LoadingController,
    public menuController: MenuController,
    public events: Events,
    public app: App
  ) {
  }

  ionViewWillEnter() {
    this.loadingCtrl.onLoading();
    this.loadNoti();
    this.loadingCtrl.dismiss();
    // alert(this.notifications);
    this.workaroundSideMenu();
  }

  loadNoti() {
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    this.notifications = JSON.parse(window.localStorage.getItem('sellerNotification'));
  }
  private workaroundSideMenu() {
    let leftMenu = this.menuController.get('left');
    if (leftMenu) {
      leftMenu.ionClose.subscribe(() => {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
      });
    }
  }

}
