import { UserModel, CorService } from '@ngcommerce/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from "../../app/app.contant";

/*
  Generated class for the ThamappAuthenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThamappAuthenProvider {

  constructor(public http: Http, public corService: CorService) {
    console.log('Hello ThamappAuthenProvider Provider');
  }
  checkUserByTel(tel): Promise<any> {
    let data = {
      tel: tel
    };
    return this.http.post(Constants.URL + 'auth/checkuserbytel', data)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  regisAndAddress(data): Promise<any> {
    return this.http.post(Constants.URL + 'auth/signupbytel/', data)
      .toPromise()
      .then((response) => {
        let res = response.json() as UserModel;
        window.localStorage.setItem('token', res.loginToken);
        window.localStorage.setItem('thamappbuyer', JSON.stringify(res));
        return res;
      })
      .catch(this.handleError);
  };

  checkTokenUser() {

    let headers = this.corService.createAuthorizationHeader();
    return this.http.get(Constants.URL + 'checkexpireuser/', { headers: headers })
      .toPromise()
      .then((response) => {
        let res = response.json() as UserModel;
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


}
