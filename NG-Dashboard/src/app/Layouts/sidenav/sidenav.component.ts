import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        'max-height': '200px',
        height: 'auto',
        opacity: 1,
        visibility: 'visible'
      })),
      state('closed', style({
        'max-height': 0,
        opacity: 0.4,
        visibility: 'hidden'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.9s ease-in-out')
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {

  public profile;
  private panel_is_open = false;

  constructor(private _auth: AuthServiceService) {
    this.profile = this._auth.getProfile();
  }

  ngOnInit() {
    // console.log(this.profile);
    
  }

  panel_toggle() {
    this.panel_is_open = !this.panel_is_open;
    console.log(this.panel_is_open);
  }

}
