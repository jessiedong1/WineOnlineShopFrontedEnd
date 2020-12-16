import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { isTemplateExpression } from 'typescript';
import { Address } from '../common/address';
import { CartItem } from '../common/cart-item';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]=[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number>=new Subject<number>();
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService,private route: Router) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  //Adding items to the shopping cart
  getCartItems():CartItem[]{
    return this.cartItems;
  }
  addToCart(theCartItem: CartItem, theQuantity: number){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem=undefined;

    //Checking if there any items in the cart
    if(this.cartItems.length>0){
      existingCartItem=this.cartItems.find(temp=>temp.product.id == theCartItem.product.id)
      alreadyExistsInCart=(existingCartItem!=undefined);
    }
    //Sum up the item quantity already in the cart
    if(alreadyExistsInCart){
      existingCartItem.quantity = existingCartItem.quantity + theQuantity;
    }
    else{
      this.cartItems.push(theCartItem);
      theCartItem.quantity = theQuantity;
    }
    this.computeCartTotals();
    
  }
  removeFromCart(theCartItem: CartItem, quan:number){
    let index:number=0;
    for(const item of this.cartItems){
      if (item.product.id === theCartItem.product.id){
        if(item.quantity >1){
          item.quantity=item.quantity-quan;
          break;
        }
        else{
          item.quantity=0;
          break;
        }
      }
      index=index+1;
    }
    if(this.cartItems[index].quantity ===0)
     {this.cartItems.splice(index,1);}
     this.computeCartTotals();
  }

  computeCartTotals(){
    let totalPriceValue: number=0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue = totalPriceValue + currentCartItem.quantity*currentCartItem.product.price;
      totalQuantityValue = totalQuantityValue+currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
  

  checkOutCart(address:Address){
    const userId= this.tokenStorage.getUser().id;
    console.log(userId);
    const url=`http://localhost:8080/wineshop/customer/${userId}/place-order`;
    const addressJson = JSON.stringify(address);
    const itemsJson = JSON.stringify(this.cartItems);
    const order = {
      "address": address,
      "productOrders":this.cartItems
    }
    // console.log(order);
    
    this.httpClient.post(url,order,this.httpOptions).subscribe(
      response =>{ 
        console.log("response" +response);
        // this.cleanCart();
        this.route.navigateByUrl(`/thankyou`).then(()=>
        window.location.reload());
   
        
      },
      error => {console.log(error)}
    );

 
  }

  cleanCart(){
    this.cartItems=[];
  }

  
}
