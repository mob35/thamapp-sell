import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { ShopModel, ShopService } from '@ngcommerce/core';
import { CreateshopPage } from '../createshop/createshop';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ShopDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {
  shop = {} as ShopModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopService: ShopService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailPage');
    this.init();
  }
  init() {
    this.loadingCtrl.onLoading();
    this.shopService.getShopByID(this.navParams.data._id)
      .then(data => {
        this.shop = data;
        console.log(this.shop);
        this.loadingCtrl.dismiss();
      }, err => {
        this.loadingCtrl.dismiss();
      });
  }
  alertdeleteShop(item) {
    this.presentConfirm(item);
  }
  presentConfirm(item) {
    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this Shop?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('delete');
            this.deleteShop(item);
          }
        }
      ]
    });
    alert.present();
  }

  deleteShop(item) {
    this.loadingCtrl.onLoading();
    this.shopService.deleteShopByID(item._id).then((data) => {
      this.navCtrl.pop();
      this.loadingCtrl.dismiss();
    }, (err) => {
      alert(JSON.parse(err._body).message);
      this.loadingCtrl.dismiss();
    });
  }
  updateShop(e) {
    let shopModal = this.modalCtrl.create(CreateshopPage, e);
    shopModal.onDidDismiss(data => {
      if (data && data.name && data.name !== undefined) {
        this.loadingCtrl.onLoading();
        this.shopService.updateShopByID(data).then((resq) => {
          // loading.dismiss();
          // this.loadingCtrl.onLoading();
          this.shopService.getShopByID(this.navParams.data._id).then(data => {
            console.log(data);
            this.loadingCtrl.dismiss();
            this.shop = data;
            // this.loadingCtrl.dismiss();
          }).catch(e => {
            this.loadingCtrl.dismiss();
            // this.loadingCtrl.dismiss();
            alert(e);
          })
          // this.navCtrl.pop();
        }, (err) => {
          this.loadingCtrl.dismiss();
          alert(JSON.parse(err._body).message);
        });
      }
    });
    shopModal.present();
  }

}
