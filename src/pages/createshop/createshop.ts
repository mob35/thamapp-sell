import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ShopModel } from '@ngcommerce/core';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the CreateshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createshop',
  templateUrl: 'createshop.html',
})
export class CreateshopPage {
  item = {} as ShopModel;
  pImages: Array<string> = [];
  resImg: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dialogs: Dialogs
  ) {
    if (this.navParams.data) {
      this.item = JSON.parse(JSON.stringify(this.navParams.data));
      this.pImages = this.item.image ? [this.item.image] : [];
      this.resImg = this.item.image ? this.item.image : '';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateshopPage');
  }
  resImageEvent(e) {
    this.resImg = e[0] ? e[0] : "";
    if(this.resImg){
      this.item.image = this.resImg;
    }else{
      this.item.image = '';
    }
  }
  createShop(data) {
    if (!data.name) {
      this.dialogs.alert('Please Enter Your Name!', 'Create Shop', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (!data.image && this.pImages.length === 0) {
      this.resImg = './assets/image/noimage.png';
    }
    data.image = this.resImg;
    // alert(data.image);
    this.viewCtrl.dismiss(data);
  }
  canceldissmis() {
    this.viewCtrl.dismiss();
  }

}
