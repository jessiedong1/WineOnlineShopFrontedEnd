import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Wine } from 'src/app/common/wine';
import { CartService } from 'src/app/services/cart.service';
import { WineService } from 'src/app/services/wine.service';




@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

  wines:Wine[];
 
  
  constructor(private wineService: WineService, private route: ActivatedRoute,private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

  listProducts(){
    this.wineService.searchWineListPaginate(0, 9,'', '','desc').subscribe(
      data=>this.wines=data._embedded.wines
    );
  
 }
 addToCart(theWine: Wine){
  const theCartItem = new CartItem(theWine);
  this.cartService.addToCart(theCartItem,1);
}
}