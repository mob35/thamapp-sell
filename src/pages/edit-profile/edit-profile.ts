import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserModel, AuthenService } from "@ngcommerce/core";
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  editProfile = {} as UserModel;
  pImages: Array<string> = [];
  resImg: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService: AuthenService,
    public alertCtrl: AlertController,
    // public loadingCtrl: LoadingController
    public loadingCtrl: LoadingProvider
  ) {
    this.loadingCtrl.onLoading();
    this.editProfile = JSON.parse(window.localStorage.getItem('thamappseller'));
    this.pImages = this.editProfile.profileImageURL ? [this.editProfile.profileImageURL] : [];
    console.log(this.pImages);
    this.loadingCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  resImageEvent(e) {
    this.resImg = e[0] ? e[0] : "";
    if(this.resImg){
      this.editProfile.profileImageURL = this.resImg;
    }else{
      this.editProfile.profileImageURL = '';
    }
    // this.resImg = './assets/image/noimage.png';
  }
  editAccount() {
    // this.editProfile
    this.loadingCtrl.onLoading();
    this.editProfile.profileImageURL = this.editProfile.profileImageURL;
    console.log(this.editProfile);
    this.authenService.updateUser(this.editProfile).then((resp) => {
      window.localStorage.setItem('thamappseller', JSON.stringify(resp));
      this.navCtrl.pop();
      this.loadingCtrl.dismiss();
    }, (error) => {
      this.loadingCtrl.dismiss();
      console.error(error);
    });
  }
  changePassword() {
    let prompt = this.alertCtrl.create({
      title: 'Change Password',
      message: "Enter a New Password",
      inputs: [
        {
          name: 'currentPassword',
          placeholder: 'Old Password',
          type: 'password',
        },
        {
          name: 'newPassword',
          placeholder: 'New Password',
          type: 'password',
        }, {
          name: 'verifyPassword',
          placeholder: 'Confirm Password',
          type: 'password',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.authenService.changePassword(data).then((resp) => {
              console.log(resp);
            }, (error) => {
              console.error(error);
            });
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
