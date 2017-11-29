import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopDetailPage } from './shop-detail';

@NgModule({
  declarations: [
    ShopDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopDetailPage),
  ],
})
export class ShopDetailPageModule {}
