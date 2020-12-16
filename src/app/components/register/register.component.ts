import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  isSubmitted = false;
  errorMessage = '';
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username:['', Validators.required, Validators.minLength(4), Validators.maxLength(20)],
      email:['', Validators.required, Validators.email],
      password:['', Validators.required,  Validators.minLength(4), Validators.maxLength(20)] 
    });

  }

  onSubmit(){
    this.isSubmitted=true;
    let user = new User(this.registerForm.get('username').value, this.registerForm.get('email').value, this.registerForm.get('password').value);
    console.log(user);
    this.authService.register(user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
      },
      err =>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
