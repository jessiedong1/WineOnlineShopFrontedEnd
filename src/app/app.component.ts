import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './common/user';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'wine-shop-web-test';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showModel:boolean;
  username: string;
  isSuccessful = false;
  isLoginFailed = false;
  isSubmitted = false;
  isSignUpFailed = false;
  errorMessage = '';
  loginForm = this.fb.group({
    username:['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required,  Validators.minLength(6), Validators.maxLength(20)]],
    repassword:['', [Validators.required,  Validators.minLength(6), Validators.maxLength(20)]]
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private tokenStorage: TokenStorageService,private route: Router){ } 
  ngOnInit(): void {
    // this.showModel=true;
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('OWNER');
      this.showManagerBoard=this.roles.includes('MANAGER');
      this.username=user.email;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
  show(){
    this.showModel = true;
    // console.log(this.showModel);
  }
  hide(){
    this.showModel=false;
   }
  onSubmit(userAction: string){
    this.isSubmitted=true;
    // console.log(userAction);
    if(userAction === 'login'){
      this.login();
    }
    else{
      this.signup();
    }
  }

  login(){
    let user = new User('', this.loginForm.get('email').value, this.loginForm.get('password').value);
    // console.log(user);
    this.authService.login(user).subscribe(
      data=>{
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err=>{
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;  
      }
    );

  }

  signup(){
    if(this.loginForm.get('password').value != this.loginForm.get('repassword').value ){
      this.errorMessage="Your reentered password must be same as Password";
      this.isSignUpFailed=true;
    }
    else{
      if(this.loginForm.get('username').valid && this.loginForm.get('email').valid && this.loginForm.get('password').valid ){
      let user = new User(this.loginForm.get('username').value, this.loginForm.get('email').value, this.loginForm.get('password').value);
      // console.log(user);
      this.authService.register(user).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err =>{
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );

    }

    }
}
  reloadPage(): void {
    if(this.roles.includes('OWNER')){
      this.route.navigateByUrl(`/admin/owner`).then(()=>
      window.location.reload());
    }
    // else{
      
    //   this.route.navigateByUrl('/').then(()=>window.location.reload());
    // }
  }
 
 
}
