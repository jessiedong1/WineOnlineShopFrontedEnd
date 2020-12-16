import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@sentry/angular';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Wine } from 'src/app/common/wine';
import { CartService } from 'src/app/services/cart.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  theUser: User;
  wine: Wine=new Wine();
  cartItems: CartItem[];
  total:number=0.00;
  // totalPrice: Subject<number> = new Subject<number>();
  // totalQuantity: Subject<number>=new Subject<number>();
  constructor(private route: ActivatedRoute, private wineService: WineService, private cartService :CartService, private tokenStorge: TokenStorageService) { }

  ngOnInit(): void {
    this.cartItems= this.cartService.getCartItems();
    this.getTotal();
    this.theUser=this.tokenStorge.getUser();
    // console.log(this.theUser);
}

removeItem(item:CartItem,quan:number){
  this.cartService.removeFromCart(item,quan);
}

getTotal(){
  console.log(this.total);
  for( const item of this.cartItems){
    this.total+= item.quantity*item.product.price;
  }
  console.log(this.total);
  this.cartService.totalPrice.subscribe(
     data=>this.total=data
   );
   
}
}
