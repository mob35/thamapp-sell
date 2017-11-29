import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

import {
  CategoryModel,
  CategoryService,
  ShippingModel,
  ShippingService,
  ShopListModel,
  ShopModel,
  ShopService,
  CurrencyModel,
  CurrencyService
} from '@ngcommerce/core';
import { LoadingProvider } from '../../providers/loading/loading';
import { ProductModel, Shipping } from './create-product.model';
/**
 * Generated class for the CreateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {
  pImages: Array<string> = [];
  shops: Array<ShopModel> = [];
  categories: Array<CategoryModel>;
  ship: Array<ShippingModel>;
  currency: Array<CurrencyModel> = [];
  e: ProductModel = new ProductModel();
  chkformimg: Boolean = false;
  showForm: Boolean = false;
  resImg: Array<string> = [];
  shippingtype = [];
  shippingprice = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopService: ShopService,
    public categoryService: CategoryService,
    public shippingService: ShippingService,
    public currencyService: CurrencyService,
    public loadingCtrl: LoadingProvider,
    // public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public dialogs: Dialogs
  ) {
    let shopselec = JSON.parse(window.localStorage.getItem('shop'));
    this.shops = [shopselec];
    // if (this.navParams.data) {
    this.e = this.navParams.data;
    // }
    this.pImages = this.e.images ? JSON.parse(JSON.stringify(this.e.images)) : [];
    this.e.shop = shopselec._id;
    this.chkformimg = this.navParams.get('keys');
    this.e.price = this.e.price ? this.e.price : 0;
    this.e.promotionprice = this.e.promotionprice ? this.e.promotionprice : 0;
    this.e.percentofdiscount = this.e.percentofdiscount ? this.e.percentofdiscount : 0;

    // this.navParams.data.shippings.forEach(element => {
    //   element.shippingtype = element.shippingtype ? element.shippingtype : {};
    //   element.shippingtype.shippingprice = element.shippingprice;
    //   this.shippingtype.push(element.shippingtype)
    // });
    // this.shippingprice = this.navParams.data.shippings.shippingprice;
    console.log(this.shippingtype);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatProductPage');
    this.loadCate();
  }
  loadShops() {
    this.loadingCtrl.onLoading();
    this.shopService.getShopListByUser().then((data) => {
      this.shops = data;
      this.loadingCtrl.dismiss();
      this.loadCate();
    }, (err) => {
      this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(err._body).message, 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
    });
  }

  loadCate() {
    this.loadingCtrl.onLoading();
    this.categoryService.getCategoryList().then((data) => {
      this.categories = data;
      this.loadingCtrl.dismiss();
      this.loadShipping();
    }, (err) => {
      this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(err._body).message, 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
    });
  }

  loadShipping() {
    this.loadingCtrl.onLoading();
    this.shippingService.getShippingList().then((data) => {
      this.ship = data;
      if (this.navParams.data && this.navParams.data.shippings && this.navParams.data.shippings.length > 0) {
        console.log(this.navParams.data.shippings);
        this.navParams.data.shippings.forEach(element => {
          this.ship.forEach(itm => {
            if (element.shippingtype._id.toString() === itm._id.toString()) {
              // element.shippingtype.user = null;
              this.shippingtype.push(itm)
            }
          });

        });

        this.navParams.data.shippings.forEach(element => {
          this.shippingtype.forEach(itm => {
            if (element.shippingtype._id.toString() === itm._id.toString()) {
              itm.shippingprice = element.shippingprice;
            }
          });

        });
      }

      this.loadingCtrl.dismiss();
      this.loadCurrency();
    }, (err) => {
      this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(err._body).message, 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
    });
  }

  loadCurrency() {
    this.loadingCtrl.onLoading();
    this.currencyService.getCurrencyList().then((data) => {
      this.currency = data;
      this.showForm = true;
      this.loadingCtrl.dismiss();
    }, (err) => {
      this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(err._body).message, 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
    });
  }

  createProduct(e) {
    // if(e.image && e.image !== undefined){
    //   e = e ? e : {};
    //   e.images = e.images ? e.images : [];
    //   e.images.push(e.image);
    // }
    this.viewCtrl.dismiss(e);
    // console.log(e);
  }

  canceldissmis() {
    this.viewCtrl.dismiss();
  }
  resImageEvent(e) {
    this.resImg = e;
    // this.e.images = e;
  }

  discountprice() {
    if (this.e.price > 0) {
      this.e.promotionprice = null;
      this.e.percentofdiscount = null;
    }
  }
  discountpromotion() {
    if (this.e.price > 0) {
      if (this.e.promotionprice > 0) {
        if (this.e.price - this.e.promotionprice >= 0) {
          let per = (this.e.promotionprice / this.e.price) * 100;
          let num = (100 - per).toString();
          let numSplit = num.split('.');
          if (numSplit && numSplit.length > 1) {
            let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
            this.e.percentofdiscount = parseFloat(concatNum);
          } else {
            this.e.percentofdiscount = parseFloat(num);
          }

          // this.item.percentofdiscount = parseFloat((100 - per).toFixed(2));
        } else {
          this.dialogs.alert('ส่วนลดมากกว่าราคาขายจริง!', 'Create Product', 'OK')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e));
          this.e.percentofdiscount = null;
          this.e.promotionprice = null;
        }
      } else {
        this.e.promotionprice = null;
        this.e.percentofdiscount = null;
      }
    } else {
      this.e.promotionprice = null;
      this.e.percentofdiscount = null;
    }
  }

  discountpercent() {
    if (this.e.price > 0) {
      if (this.e.percentofdiscount > 0) {
        if (this.e.percentofdiscount <= 100) {
          let pro = (this.e.percentofdiscount * this.e.price) / 100;

          let num = (pro).toString();
          let numSplit = num.split('.');
          if (numSplit && numSplit.length > 1) {
            let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
            this.e.promotionprice = parseFloat(concatNum);
          } else {
            this.e.promotionprice = parseFloat(num);
          }
          // this.e.promotionprice = parseFloat((this.e.price - pro).toFixed(2));
        } else {
          this.dialogs.alert('มากกว่า 100 เปอร์เซ็นต์!', 'Create Product', 'OK')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e));
          this.e.promotionprice = null;
          this.e.percentofdiscount = null;
        }
      } else {
        this.e.promotionprice = null;
        this.e.percentofdiscount = null;
      }
    } else {
      this.e.promotionprice = null;
      this.e.percentofdiscount = null;
    }
  }

  chkNumber(num, field) {
    let nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let status = false;
    if (num !== null) {

      let numID = num.toString();
      nums.forEach(function (num) {
        if (numID.length > 1) {
          if (numID.substr(numID.length - 1) === num) {
            status = true;
          }
        } else {
          if (numID === num) {
            status = true;
          }
        }

      });

      if (!status) {
        if (field.toString() === 'price') {
          this.e.price = parseFloat(this.e.price.toString().slice(0, this.e.price.toString().length - 1));
        } else if (field.toString() === 'promotionprice') {
          this.e.promotionprice = parseFloat(this.e.promotionprice.toString().slice(0, this.e.promotionprice.toString().length - 1));
        } else if (field.toString() === 'percentofdiscount') {
          this.e.percentofdiscount = parseFloat(this.e.percentofdiscount.toString().slice(0, this.e.percentofdiscount.toString().length - 1));
        }
      }

    } else {
      if (field.toString() === 'price') {
        this.e.price = null;
      } else if (field.toString() === 'promotionprice') {
        this.e.promotionprice = null;
      } else if (field.toString() === 'percentofdiscount') {
        this.e.percentofdiscount = null;
      }
    }
  }

  toFixedNum(numbe, field) {
    if (numbe && numbe !== null) {
      let num = numbe.toString();
      if (field.toString() === 'price') {
        let numSplit = num.split('.');
        if (numSplit && numSplit.length > 1) {
          let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
          this.e.price = parseFloat(concatNum);
        } else {
          this.e.price = parseFloat(numSplit);
        }
      } else if (field.toString() === 'promotionprice') {
        let numSplit = num.split('.');
        if (numSplit && numSplit.length > 1) {
          let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
          this.e.promotionprice = parseFloat(concatNum);
        } else {
          this.e.promotionprice = parseFloat(numSplit);
        }
      } else if (field.toString() === 'percentofdiscount') {
        let numSplit = num.split('.');
        if (numSplit && numSplit.length > 1) {
          let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
          this.e.percentofdiscount = parseFloat(concatNum);
        } else {
          this.e.percentofdiscount = parseFloat(numSplit);
        }
      }
    }
  }
  onClickAddProd(el) {
    el.shippings = [];
    this.shippingtype.forEach(function (s) {
      el.shippings.push({
        shippingtype: s,
        shippingprice: s.shippingprice
      });
    });
    // e.shippings.shippingtype = this.shippingtype;
    if (!el.name) {
      this.dialogs.alert('Please Enter Your Name!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (!el.detail) {
      this.dialogs.alert('Please Enter Your Detail!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (!el.price) {
      this.dialogs.alert('Please Enter Your Price!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (!el.currency) {
      this.dialogs.alert('Please Enter Your Currency!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (el.shippings.length === 0) {
      this.dialogs.alert('Please Enter Your Shippings!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (!el.categories) {
      this.dialogs.alert('Please Enter Your Categories!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (!el.shop) {
      this.dialogs.alert('Please Enter Your Shop!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    } else if (this.pImages.length === 0) {
      this.dialogs.alert('Please Enter Your Upload Image!', 'Create Product', 'OK')
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
      return;
    }
    if (this.pImages.length > 0) {
      el.images = this.pImages;
      this.viewCtrl.dismiss(el);
    } else {
      el.images = this.resImg;
      this.viewCtrl.dismiss(el);
    }
    // this.itemClicked.emit(item);
  }

}
