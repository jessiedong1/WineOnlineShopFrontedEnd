import { findLast } from '@angular/compiler/src/directive_resolver';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { Wine } from 'src/app/common/wine';
import { WineService } from 'src/app/services/wine.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  descriptionForm = this.fb.group({
    description:['', [Validators.required, Validators.maxLength(200)]]
  });
  isSubmitted:boolean=false;
  isSuccessful:boolean=false;
  wines:Wine[];
  slides: any = [[]];
  wineList:Wine[];
  constructor(private fb: FormBuilder, private wineService: WineService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    AOS.init();
  }
  onSubmit(){
    this.isSubmitted=true;
    this.wineService.getWineDivine(this.descriptionForm.get('description').value).subscribe(
      data=>{this.wines=data;
      this.slides=this.chunk(this.wines, 3);
      this.isSuccessful=true;},
      err =>{
        this.isSuccessful = false;
        this.wines=undefined;
      }
    );
    
    
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

}




