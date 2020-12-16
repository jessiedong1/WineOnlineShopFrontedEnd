import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

import { Wine } from 'src/app/common/wine';
import { CartService } from 'src/app/services/cart.service';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.css']
})
export class WineDetailsComponent implements OnInit {
  quantityForm = this.fb.group({
    quantity:[1, Validators.required]
  })
  wine: Wine=new Wine();
  constructor(private route: ActivatedRoute, private wineService: WineService, private fb: FormBuilder, private cartService :CartService) { }

  ngOnInit(): void {
    const theWineId:number =+this.route.snapshot.paramMap.get('keyword');
    this.wineService.getWine(theWineId).subscribe(
      data=>
       { this.wine = data._embedded.wines[0];
        // console.log(this.wine)
       }
      );  
}


buttonMinus(){
  if(parseInt(this.quantityForm.get('quantity').value) >1)
  this.quantityForm.get('quantity').setValue(parseInt(this.quantityForm.get('quantity').value )-1);

}
buttonPlus(){
  this.quantityForm.get('quantity').setValue(parseInt(this.quantityForm.get('quantity').value )+1);
}

addToCart(theWine: Wine){
  const theCartIem = new CartItem(theWine);
  this.cartService.addToCart(theCartIem, parseInt(this.quantityForm.get('quantity').value));

}
}

