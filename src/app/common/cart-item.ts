import { Wine } from './wine';
export class CartItem {
    // id: number;
    // title:string;
    // price:number;
    // imageUrl: string;
    product:Wine
    quantity: number;
    constructor(wine:Wine){
        this.product=wine;
    }
    // constructor(wine: Wine){
    //     this.id=wine.id;
    //     this.title=wine.title;
    //     this.price=wine.price;
    //     this.imageUrl=wine.imageUrl;
    // }
}
