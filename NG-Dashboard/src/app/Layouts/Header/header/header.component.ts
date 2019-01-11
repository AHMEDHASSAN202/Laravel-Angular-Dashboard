import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input('drawer') drawer;

  constructor(private _auth: AuthServiceService, private _router: Router) { }

  logout() {    
    this._auth.logout().subscribe(
      data => {}, 
      error => {
      console.log(error);
    },
    () => {
      this._router.navigateByUrl('/login');
    }
    );
  }



}
