import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessagesService } from '../messages/messages.service';
import { apiEndPoint } from '../shared/constants';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": 'application/json',
    "Accept": 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  public loginUrl: string = apiEndPoint + 'login';
  private getProfileUrl: string = apiEndPoint + 'users/profile';
  private logoutUrl: string = apiEndPoint + 'logout';
  private data = null;
  public status = false;

  constructor(private _http: HttpClient, private _router: Router, private _messages: MessagesService) { }

  /**
   * 
   * Login Method 
   * 
   * @param email 
   * @param password 
   * @param rememberMe 
   */
  login(email, password, rememberMe: boolean) {
    if (email == '' || password == '') {
      return false;
    }
    let data = {
      email: email,
      password: password,
      rememberMe: rememberMe
    };

    return this._http.post(this.loginUrl, JSON.stringify(data), httpOptions).subscribe(
      (data: any) => {
        if (data.status) {
          this._messages.clearMessage();
          this.setData(data);
          this.status = data.status;
          this.setTokenInLocalStorage(data.data.token);
          return this._router.navigate(['dashboard']);
        }else {
          this._messages.addMessage(data.message);
        }
      },
      error => {
        this._messages.addMessage(error.message);
      }
    );
    
  }

  /**
   * set user data
   * 
   * @param data 
   */
  setData(data) {
    this.data = data;
  }

  /**
   * store token in local storage
   * 
   * @param token 
   */
  setTokenInLocalStorage(token: string) {
    localStorage.setItem('auth', JSON.stringify({token: token}));
  }

  /**
   * get token from local storage
   * 
   * @return object
   */
  getTokenFormLocalStorage() {
    return JSON.parse(localStorage.getItem('auth'));
  }

  /**
   * Check if Logged 
   * 
   * @returns boolean
   */
  checkLoggedIn() : boolean {
    if (this.status) {
      return true;
    }
    return false;
  }

  /**
   * Get Profile Information
   * 
   */
  getProfile() {
    if (this.checkLoggedIn()) {
      return this.data.data.profile;
    }
    return false;
  }

  /**
   * get token 
   * 
   */
  getAuthorizationToken() {
    if (this.checkLoggedIn()) {
      return this.data.data.token;
    }
    if (localStorage.getItem('auth')) {
      return this.getTokenFormLocalStorage().token;
    }
    return false;
  }

  /**
   * check token is valid and get profile user by token
   * 
   */
  checkProfile() {
    return this._http.post(this.getProfileUrl, {}, this.setBaseHeaders()).toPromise();
  }

  /**
   * set base headers
   * 
   */
  setBaseHeaders() {
    let token = this.getAuthorizationToken();
    return {
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Authorization": "Bearer " + token
      }) 
    }
  };

  /**
   * logout User
   * 
   */
  logout() {
    console.log(this.getAuthorizationToken());
    let headers = this.setBaseHeaders();
    // this.setData(null);
    localStorage.clear();
    console.log(headers);
    
    return this._http.post(this.logoutUrl, {}, headers);
  }

}
