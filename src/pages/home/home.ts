import { LoadingProvider } from './../../providers/loading/loading';
import { LoginPage } from '../login/login';
import { Component, ViewChild } from '@angular/core';
import { NavController, App, Events, LoadingController } from 'ionic-angular';
import { HomeService, ShopModel } from '@ngcommerce/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homeData: any = {
    items: {
      day: { amount: 0 },
      month: { amount: 0 },
      year: { amount: 0 },
      categories: [{
        cate: ''
      }]
    },
    report: []
  };
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  doughnutChart: any;
  lineChart: any;
  user: any;
  shop = {} as ShopModel;
  flag = true;
  // loading = this.loadingCtrl.create();

  constructor(
    public navCtrl: NavController,
    public homeService: HomeService,
    // public loadingCtrl: LoadingController,
    public app: App,
    public events: Events,
    public loadingCtrl: LoadingProvider
  ) {
    this.subnoti();
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad HomePage');
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    if (this.shop) {
      this.getOrder(this.shop);
    }
    let user = JSON.parse(window.localStorage.getItem("thamappseller"));
    if (!user) {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

  subnoti() {
    this.events.subscribe('notification:received', () => {
      // let shop = JSON.parse(window.localStorage.getItem("shop"));
      // this.shop = shop;
      // if (this.shop) {
      //   this.getOrder(this.shop);
      // }

      let currentPage = this.app.getActiveNav().getViews()[0].name;
      if (currentPage === 'HomePage') {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
        if (this.shop && this.flag) {
          this.flag = false;
          // this.loadingCtrl.onLoading();
          this.getOrder(this.shop);
          // this.loadingCtrl.dismiss();
        }
        // this.events.unsubscribe('notification:received');
        // this.subnoti();
      }

    });
  }
  getOrder(shop) {
    this.loadingCtrl.onLoading();

    this.homeService.getHomeSeller(shop._id).then(data => {

      this.homeData = data;
      if (this.lineCanvas) {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: [this.homeData.report[3].title, this.homeData.report[2].title, this.homeData.report[1].title, this.homeData.report[0].title],
            datasets: [
              {
                label: "",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#ff0000",
                borderColor: "#ff0000",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#ff0000",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#ff0000",
                pointHoverBorderColor: "#ff0000",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                // data:[12000,2300,300,100000],
                data: [this.homeData.report[3].amount, this.homeData.report[2].amount, this.homeData.report[1].amount, this.homeData.report[0].amount],
                spanGaps: false,
              }
            ]
          },
          options: {
            legend: {
              display: false,
              labels: {
                fontColor: 'white'
              }
            },
            scales: {
              yAxes: [{
                gridLines: {
                  display: false,
                  color: "gray"
                },
                ticks: {
                  fontColor: "white",
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false,
                  color: "gray"
                },
                ticks: {
                  fontColor: "white",
                }
              }]
            }
          }

        });
      }
      this.flag = true;
      this.loadingCtrl.dismissAll();

    }, err => {
      this.flag = true;
      this.loadingCtrl.dismissAll();

      // alert(JSON.parse(err._body).message);
      this.app.getRootNav().setRoot(LoginPage);
    })
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
