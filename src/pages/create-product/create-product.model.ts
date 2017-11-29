import { CategoryModel, ReviewsModel, ShopModel } from "@ngcommerce/core";

export class ProductModel {
    _id: string;
    name: string;
    detail: string;
    price: number;
    promotionprice: number;
    percentofdiscount: number;
    currency: string;
    categories: Array<CategoryModel>;
    images: Array<string>;
    reviews: Array<ReviewsModel>;
    shippings: Array<DataShipping>;
    shop: ShopModel;
    cod: Boolean;
    isFavorite: Boolean;
}

export class DataShipping {
    shippingtype: Shipping = new Shipping();
    shippingprice: Number;
}

export class Shipping {
    _id: string;
    name: string;
    detail: string;
    dudate: number;
    price: number;
}