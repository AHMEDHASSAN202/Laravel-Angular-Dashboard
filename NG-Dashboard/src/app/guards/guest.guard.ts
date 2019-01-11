import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanLoad {

  constructor(private _auth: AuthServiceService, private _location: Location) {}
  async canLoad() {
    if (this._auth.checkLoggedIn()) {
      this._location.back();
      return false;
    }
    //check if exists token 
    let auth: any = localStorage.getItem('auth') ? this._auth.getTokenFormLocalStorage() : false;
    //check valid token
    if (auth.token) {
      let data: any = await this._auth.checkProfile().catch(e => {
        return true; 
      });
      //check response
      if (data.status) {
        this._location.back();
        return false;
      }
    }
    return true;
  }
}
