import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the IonDetailProductComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-detail-product',
  templateUrl: 'ion-detail-product.html'
})
export class IonDetailProductComponent {
  @Input() item: any;
  @Input() isReview: Boolean;
  @Input() isIcon: Boolean;
  @Output() selectedFavorite: EventEmitter<any> = new EventEmitter<any>();
  @Output() review: EventEmitter<any> = new EventEmitter<any>();
  groups: Array<any> = [
    {
      name: '5',
      percent: '0%',
      sum: 0
    },
    {
      name: '4',
      percent: '0%',
      sum: 0
    },
    {
      name: '3',
      percent: '0%',
      sum: 0
    },
    {
      name: '2',
      percent: '0%',
      sum: 0
    },
    {
      name: '1',
      percent: '0%',
      sum: 0
    }
  ];

  constructor() {
    // console.log('Hello IonDetailProductComponent Component');
  }
  favorite(item) {
    this.selectedFavorite.emit(item);
  }
  createReview() {
    this.review.emit('createReview');
  }
}
