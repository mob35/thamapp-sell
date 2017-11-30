import { OrderDetailPage } from './../pages/order-detail/order-detail';
import { EditProfilePage } from './../pages/edit-profile/edit-profile';
import { IonUploadImagesComponent } from './../components/ion-upload-image/ion-upload-image';
import { CreateProductPage } from './../pages/create-product/create-product';
import { NotificationPage } from './../pages/notification/notification';
import { ProductPage } from './../pages/product/product';
import { OrderPage } from './../pages/order/order';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { OneSignal } from '@ionic-native/onesignal';
import { Dialogs } from '@ionic-native/dialogs';

import { EcommerceCoreModule, IonSegmentOrderComponent, IonListOrderComponent, IonOrdersComponent, IonDetailOrderComponent, IonFormProfileComponent, IonListProductComponent, IonFormProductComponent, IonListShopComponent, IonFormShopComponent, IonUploadImageComponent, IonDetailShopComponent, IonListScollXComponent } from "@ngcommerce/core";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { CreateshopPage } from '../pages/createshop/createshop';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ListshopPage } from '../pages/listshop/listshop';
import { ShopDetailPage } from '../pages/shop-detail/shop-detail';
import { LoadingProvider } from '../providers/loading/loading';
import { MomentPipe } from "../pipes/moment/moment";
import { IonDetailProductComponent } from "../components/ion-detail-product/ion-detail-product";
import { ThamappAuthenProvider } from '../providers/thamapp-authen/thamapp-authen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    OrderPage,
    ProductPage,
    NotificationPage,
    CreateshopPage,
    IonFormShopComponent,
    IonUploadImagesComponent,
    IonUploadImageComponent,
    IonListProductComponent,
    ProductDetailPage,
    IonFormProductComponent,
    IonDetailProductComponent,
    CreateProductPage,
    IonFormProfileComponent,
    ListshopPage,
    IonListShopComponent,
    ShopDetailPage,
    IonDetailShopComponent,
    EditProfilePage,
    IonListOrderComponent,
    IonSegmentOrderComponent,
    IonDetailOrderComponent,
    IonOrdersComponent,
    OrderDetailPage,
    MomentPipe,
    IonListScollXComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    EcommerceCoreModule.forRoot('https://thamturakit.herokuapp.com/api/')
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    OrderPage,
    ProductPage,
    NotificationPage,
    CreateshopPage,
    IonFormShopComponent,
    IonUploadImagesComponent,
    IonUploadImageComponent,
    ProductDetailPage,
    CreateProductPage,
    ListshopPage,
    IonListShopComponent,
    ShopDetailPage,
    EditProfilePage,
    OrderDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    Dialogs,
    ImagePicker,
    Base64,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    ThamappAuthenProvider
  ]
})
export class AppModule { }
