import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wine } from '../common/wine';
import { map } from 'rxjs/operators';
import { ɵangular_packages_router_router_b } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class WineService {
  private baseUrl = "http://localhost:8080/wineshop";

  constructor(private httpClient: HttpClient) { }

  getWine(theWineId:number):Observable<GetResponseWines>{
    return this.httpClient.get<GetResponseWines>(`${this.baseUrl}/wines/search/findById?id=${theWineId}`);
  }

  searchWineListPaginate(thePage: number, thePageSize:number, theKeyword:string, theSortCriteria:string, theSortCriteriaOrder:string):Observable<GetResponseWines>{
    const searchUrl = `${this.baseUrl}/wines/search/findByTitleContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}&sort=${theSortCriteria},${theSortCriteriaOrder}`;
    return this.httpClient.get<GetResponseWines>(searchUrl);
  }
  getWineListByVariety(thePage: number, thePageSize:number,winetype:string, theSortCriteria:string, theSortCriteriaOrder:string):Observable<GetResponseWines>{

    return this.httpClient.get<GetResponseWines>(`${this.baseUrl}/wines/search/findByVarietyWineType?winetype=${winetype}&page=${thePage}&size=${thePageSize}&sort=${theSortCriteria},${theSortCriteriaOrder}`)

  }

  getWineDivine(description:string):Observable<Wine[]>{
    return this.httpClient.get<Wine[]>(`${this.baseUrl}/wine-divine/description?desc=${description}&region=`);
  }
}


 interface GetResponseWines {
  _embedded: {
    wines: Wine[];
  }
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
    }
  
 }
