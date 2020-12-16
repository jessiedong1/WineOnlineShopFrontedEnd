import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Wine } from 'src/app/common/wine';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  SearchForm = this.fb.group({
    SearchKeyword:['', Validators.required]
  });
  wines: Wine[];

  constructor(private wineService: WineService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
  }
  SearchByKeyword(){
    let keywords = this.SearchForm.get('SearchKeyword').value;
    this.route.navigateByUrl(`/search/${keywords}`);
  }

}
