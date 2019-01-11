import { Injectable } from '@angular/core';
import { Route, CanLoad, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  
  private redirectUrl = '/login';

  constructor(private _auth: AuthServiceService, private _router: Router) {}


  async canLoad(route: Route) {

    //check if logged in 
    if (this._auth.checkLoggedIn()) {
      return true;
    }
    
    //when refresh page we will get token from local storage and check is token
    let token: any = this._auth.getTokenFormLocalStorage();

    //if not exists token local
    if (!token) {
      this._router.navigate([this.redirectUrl]);
      return false;

    }else {
      let data:any =  await this._auth.checkProfile().catch(e => {
        this._router.navigate([this.redirectUrl]);
        return false
      });
      localStorage.removeItem('auth');
      if (data.status) {
        this._auth.setData(data);
        this._auth.status = true;
        this._auth.setTokenInLocalStorage(data.data.token);
        return true;
      }else {
        this._router.navigate([this.redirectUrl])
        return false;
      }
    }
    
  }


}