import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-customer',
  templateUrl: './board-customer.component.html',
  styleUrls: ['./board-customer.component.css']
})
export class BoardCustomerComponent implements OnInit {

  content: string;
  email:string;
  isLoggedIn = false;
  id:number;
  constructor(private userService: UserService,  private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.email=user.email;
    }
    
    // this.userService.getCustomerBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }

}
