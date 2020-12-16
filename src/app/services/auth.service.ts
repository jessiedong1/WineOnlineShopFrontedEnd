import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';

const AUTH_API = 'http://localhost:8080/wineshop/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(credentials:User): Observable<any>{
    const jsonPC=JSON.stringify(credentials);
    return this.http.post(AUTH_API+'signin', jsonPC, httpOptions);
  }
  register(user:User):Observable<any>{
    const jsonPC=JSON.stringify(user);
    return this.http.post(AUTH_API+'signup',jsonPC, httpOptions);
  }
}
