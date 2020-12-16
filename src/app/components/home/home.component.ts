import { Component, OnInit } from '@angular/core';
import { NgControlStatusGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Wine } from 'src/app/common/wine';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wines:Wine[];

  constructor(private wineService: WineService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(()=>{
    //   this.listProducts();
    // });
  }

  listProducts(){
    this.wineService.searchWineListPaginate(0, 9,'', 'price','desc').subscribe(
      data=>{this.wines=data._embedded.wines}
    );
    }
  }

