import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, Event, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  loading = false;

  @ViewChild('drawer') drawer: ElementRef;

  constructor(private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      switch(true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
      }
    })
  }

  ngOnInit() {
  }

}
