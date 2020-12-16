import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Wine } from 'src/app/common/wine';
import { CartService } from 'src/app/services/cart.service';
import { WineService } from 'src/app/services/wine.service';
import {ThemePalette} from '@angular/material/core';
import { FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent implements OnInit {
  wines:Wine[];
  winesPage:Wine[];
  theKeyword:string='';
  thePageNumber: number =1;
  thePageSize:number =9;
  thetotalPages: number =0;
  theSortCriteriaOrder: string ='desc';
  theSortCriteria: string = 'point';
  variety:string='';
  region:string='';
  varieties:string[]=['Red Wine', 'White Wine', 'Rose Wine'];
  selected:number=-1;
  sortCriteriaIndex:number=0;
  sortCriteria:string[]= ['Price: Low to High','Price: High to Low', 'Point: Low to High','Point: High to Low'] ;
  sortForm=new FormControl('');
  constructor(private wineService: WineService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts(this.thePageNumber,this.variety,this.region);
    });
    
  }
  addToCart(theWine: Wine){
    const theCartItem = new CartItem(theWine);
    this.cartService.addToCart(theCartItem,1);
  }
  listProducts(pageNumber: number, variety:string, region:string='' ){
    this.thePageNumber = pageNumber;
    const hastheKeyword:boolean = this.route.snapshot.paramMap.has('keyword');
    console.log(this.sortForm.value);
    if(this.sortForm.value===0){
      this.theSortCriteria='price';
      this.theSortCriteriaOrder='asc';
    }
    if(this.sortForm.value===1){
      this.theSortCriteria='price';
      this.theSortCriteriaOrder='desc';
    }
    
    if(this.sortForm.value===2){
      this.theSortCriteria='point';
      this.theSortCriteriaOrder='asc';
    }
    if(this.sortForm.value===3){
      this.theSortCriteria='point';
      this.theSortCriteriaOrder='desc';
    }
    if(hastheKeyword){
      this.theKeyword=this.route.snapshot.paramMap.get('keyword');
    }
    if(variety!==''){
      this.variety=variety;
      console.log(this.variety);
      this.wineService.getWineListByVariety(this.thePageNumber-1, this.thePageSize,this.variety, this.theSortCriteria,this.theSortCriteriaOrder).subscribe(data=>
        {this.wines = data._embedded.wines;
        this.thePageNumber = data.page.number+1;
        this.thePageSize=data.page.size;
        this.thetotalPages = data.page.totalPages;}
      );  
    }
    else{
      this.selected=-1;
      this.wineService.searchWineListPaginate(this.thePageNumber-1, this.thePageSize,this.theKeyword,this.theSortCriteria ,this.theSortCriteriaOrder).subscribe(
        data=>
          {this.wines = data._embedded.wines;
          this.thePageNumber = data.page.number+1;
          this.thePageSize=data.page.size;
          this.thetotalPages = data.page.totalPages;}
        );  
          }
  }

  plusPageNumber(){
    if(this.thePageNumber < (this.thetotalPages-2)){
      this.thePageNumber = this.thePageNumber+1;
      console.log(this.thePageNumber);
      console.log(this.thetotalPages);
    }
    this.listProducts(this.thePageNumber,this.variety,this.region);
  }
  minusPageNumber(){
    if(this.thePageNumber>1){
      this.thePageNumber = this.thePageNumber-1;
    }
    this.listProducts(this.thePageNumber,this.variety,this.region);
  }
}


