import { OrderDetailPage } from './../order-detail/order-detail';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, Events, LoadingController } from 'ionic-angular';
import { OrderService, ItemByOrderByShopModel, ShopModel } from "@ngcommerce/core";
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  order = {} as ItemByOrderByShopModel;
  channel: number;
  steps: Array<any> = [
    {
      value: 1,
      title: "New Order"
    },
    {
      value: 2,
      title: "Accept"
    },
    {
      value: 3,
      title: "Sent"
    }
    ,
    {
      value: 4,
      title: "Return"
    }
  ];
  shop = {} as ShopModel;
  flag = true;

  // loading = this.loadingCtrl.create();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public loadingCtrl: LoadingProvider,
    public menuController: MenuController,
    public app: App,
    public events: Events,
    // public loadingCtrl: LoadingController
  ) {
    this.channel = 1;
    events.subscribe('notification:received', () => {
      this.shop = JSON.parse(window.localStorage.getItem('shop'));
      // if (this.shop) {
      //   this.getOrder(this.shop);
      // }

      let currentPage = this.app.getActiveNav().getViews()[0].name;
      if (currentPage === 'OrderPage') {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
        if (this.shop && this.flag) {
          this.flag = false;
          this.getOrder(this.shop);
        }
      }

    });
  }

  ionViewWillEnter() {
    this.shop = JSON.parse(window.localStorage.getItem('shop'));
    if (this.shop) {
      this.getOrder(this.shop);
    }
  }

  getOrder(shop) {
    this.loadingCtrl.onLoading();
    this.orderService.getOrderByShop(shop._id).then((data) => {
      console.log(data);
      this.order = data;
      this.flag = true;
      this.loadingCtrl.dismissAll();
    }, (err) => {
      this.flag = true;
      this.loadingCtrl.dismissAll();
      // alert(JSON.parse(err._body).message);
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

  selectedItem(e) {
    console.log(e);
    this.navCtrl.push(OrderDetailPage, e);
    // alert(e);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
