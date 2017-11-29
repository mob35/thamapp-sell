import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OrderService } from "@ngcommerce/core";
import { LoadingProvider } from '../../providers/loading/loading';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  items;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController,
    // public loadingCtrl: LoadingController
    public loadingCtrl: LoadingProvider,
    public dialogs: Dialogs

  ) {
    this.loadingCtrl.onLoading();
    this.items = this.navParams.data;
    this.loadingCtrl.dismiss();
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  showPrompt(order_id, item_id) {
    let prompt = this.alertCtrl.create({
      title: 'Ref. ID',
      message: "Please Enter Your Ref. ID",
      inputs: [
        {
          name: 'refid',
          placeholder: 'Ref. ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.loadingCtrl.onLoading();
            this.orderService.updateItemToSent(order_id, item_id).then((data) => {
              this.loadingCtrl.dismissAll();
              this.navCtrl.pop();
            }, (err) => {
              this.loadingCtrl.dismissAll();
              if (JSON.parse(err._body).message) {
                this.dialogs.alert(JSON.parse(err._body).message, 'Order Detail', 'OK');
              } else {
                console.log(err);
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateStatus(item) {
    this.loadingCtrl.onLoading();
    if (item.status == "waiting") {
      this.orderService.updateItemToAccept(item.order_id, item.item_id).then((data) => {
        this.loadingCtrl.dismiss();
        this.navCtrl.pop();
      }, (err) => {
        this.loadingCtrl.dismissAll();
        if (JSON.parse(err._body).message) {
          this.dialogs.alert(JSON.parse(err._body).message, 'Order Detail', 'OK');
        } else {
          console.log(err);
        }
      });
    } else if (item.status == "accept") {
      this.loadingCtrl.dismissAll();

      this.showPrompt(item.order_id, item.item_id);

    } else if (item.status == "sent") {
      this.orderService.updateItemToComplete(item.order_id, item.item_id).then((data) => {
        this.loadingCtrl.dismissAll();
        this.navCtrl.pop();
      }, (err) => {
        this.loadingCtrl.dismissAll();
        if (JSON.parse(err._body).message) {
          this.dialogs.alert(JSON.parse(err._body).message, 'Order Detail', 'OK');
        } else {
          console.log(err);
        }
      })
    } else if (item.status == "return") {

    }

  }

  updateStatusReject(item) {
    this.loadingCtrl.onLoading();
    this.orderService.updateItemToReject(item.order_id, item.item_id).then((data) => {
      this.loadingCtrl.dismissAll();
      this.navCtrl.pop();
    }, (err) => {
      this.loadingCtrl.dismissAll();
      if (JSON.parse(err._body).message) {
        this.dialogs.alert(JSON.parse(err._body).message, 'Order Detail', 'OK');
      } else {
        console.log(err);
      }
    })

  }

}
