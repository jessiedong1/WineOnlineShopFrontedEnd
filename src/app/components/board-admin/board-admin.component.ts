import { Component, OnInit } from '@angular/core';
import { User } from '@sentry/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content: string;
  userList: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getOwnerrBoard().subscribe(
      data => {
        this.userList = data;
        console.log(this.userList);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}