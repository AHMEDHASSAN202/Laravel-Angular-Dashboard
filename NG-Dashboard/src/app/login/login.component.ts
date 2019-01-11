import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import { MessagesComponent } from '../messages/messages.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checked: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        password: new FormControl('', [Validators.required])
      });

  constructor(private _auth: AuthServiceService) {}

  ngOnInit() {}

  getErrorMessageEmail() {
    let error = '';
    if (this.loginForm.controls.email.hasError('required')) {
      error = 'You must enter a email'
    }else if (this.loginForm.controls.email.hasError('email')) {
      error = 'Not a valid email'
    }else if (this.loginForm.controls.email.hasError('pattern')) {
      error = 'ivalid email';
    }
    return error;
  }

  getErrorMessagePassword() {
    return this.loginForm.controls.password.hasError('required') ? 'You must enter a value' : '';
  }

  login() {
    return this._auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value, this.checked);
  }
}
