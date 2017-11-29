import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ProductPage } from './../product/product';
import { OrderPage } from './../order/order';
import { NotificationPage } from './../notification/notification';
import { ShopService } from '@ngcommerce/core';
import { ModalController, LoadingController } from 'ionic-angular';
import { CreateshopPage } from '../createshop/createshop';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OrderPage;
  tab3Root = ProductPage;
  tab4Root = NotificationPage;
  tab5Root = AboutPage;

  constructor(
    public shopService: ShopService,
    public modalControl: ModalController,
    public loadingCtrl: LoadingController,
    public dialogs: Dialogs
    
  ) {

  }

  ionViewWillEnter() {
    this.getShop();
  }
  getShop() {
    // let loading = this.loadingCtrl.create();
    // loading.present();
    this.shopService.getShopListByUser().then(data => {
      console.log(data);
      // loading.dismiss();
      if (data && data.length === 0) {
        this.createShopModal();
      }
    }, err => {
      // loading.dismiss();
      // alert(JSON.parse(err._body).message);
    });
  }
  createShopModal() {
    let shopModal = this.modalControl.create(CreateshopPage);
    shopModal.onDidDismiss(data => {
      if (data && data.name) {
        // let loading = this.loadingCtrl.create();
        // loading.present();
        this.shopService.createShop(data)
          .then((resp) => {
            // loading.dismiss();
          }, (err) => {
            // loading.dismiss();
            this.dialogs.alert(JSON.parse(err._body).message, 'Shop Detail', 'OK')
            .then(() => console.log('Dialog dismissed'))
            .catch(e => console.log('Error displaying dialog', e));
          });
      }

    });
    shopModal.present();

  }
}
