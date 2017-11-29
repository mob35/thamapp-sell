import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform, MenuController, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { UserModel, ShopService } from '@ngcommerce/core';
import * as firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  user = {} as UserModel;
  private shopList: Array<any> = [];
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menuController: MenuController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public shopService: ShopService,
    private oneSignal: OneSignal
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.workaroundSideMenu();
    this.configFirebase();
    if (platform.is('cordova')) {
      this.onSignalSetup();
    }
  }

  initLoadStoreList() {
    this.user = JSON.parse(window.localStorage.getItem('thamappseller'));

    if (this.user) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.shopService.getShopListByUser().then(data => {
        this.shopList = data;
        loading.dismiss();
      }).catch(err => {
        window.localStorage.removeItem('thamappseller');
        window.localStorage.removeItem('shop');
        this.rootPage = LoginPage;
        loading.dismiss();

      });
    }
  }

  selectShop(item) {
    window.localStorage.setItem('shop', JSON.stringify(item));
    this.events.publish('notification:received'); // ขอใช้ Function เดียวกับ notification ครับ
  }

  private workaroundSideMenu() {
    setTimeout(() => {
      let leftMenu = this.menuController.get('left');

      if (leftMenu) {
        leftMenu.ionOpen.subscribe(() => {
          this.initLoadStoreList();
        });
      }
    }, 1000);
  }

  isShow(id) {
    let shopId = window.localStorage.getItem('shop') ? JSON.parse(window.localStorage.getItem('shop'))._id : null;
    return shopId === id;
  }

  configFirebase() {
    let config = {
      apiKey: "AIzaSyA-adeTrR-W9bWXK0Z41c7VlJg9mGwUoZg",
      authDomain: "thamturakit-id.firebaseapp.com",
      databaseURL: "https://thamturakit-id.firebaseio.com/",
      projectId: "thamturakit-id",
      storageBucket: "thamturakit-id.appspot.com",
      messagingSenderId: "503984043648"
    };
    firebase.initializeApp(config);
  }

  onSignalSetup() {
    this.oneSignal.startInit('4b62e07d-3f2d-46a0-96f1-542b2fb46bd4', '878156639989');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((onReceived) => {
      // do something when notification is received
      let notifications = window.localStorage.getItem('sellerNotification') ? JSON.parse(window.localStorage.getItem('sellerNotification')) : [];

      notifications.unshift({
        date: new Date(),
        message: onReceived.payload.body
      });

      window.localStorage.setItem('sellerNotification', JSON.stringify(notifications));
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
}
