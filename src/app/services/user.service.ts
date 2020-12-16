import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@sentry/angular';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/wineshop/auth/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'home', { responseType: 'text' });
  }

  getCustomerBoard(): Observable<any> {
    return this.http.get(API_URL + 'customer', { responseType: 'text' });
  }

  getOwnerrBoard(): Observable<User[]> {

    // return this.http.get(API_URL + 'admin/owner', { responseType: 'text' });

    return this.http.get<User[]>(API_URL + 'admin/owner');
  }

  getManagerBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin/manager', { responseType: 'text' });
  }

  getStaffBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin/staff', { responseType: 'text' });
  }
}

// interface GetResponseOrders {
//   _embedded: {
//     wines: Wine[];
//   }
//     page: {
//       size: number,
//       totalElements: number,
//       totalPages: number,
//       number: number
//     }
  
//  }
