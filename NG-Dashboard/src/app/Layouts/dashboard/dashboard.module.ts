import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HeaderModule } from '../Header/header.module';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { LayoutsComponent } from '../layouts.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { DashboardComponent } from '../../dashboard/dashboard.component';

//  import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    MatSidenavModule,
    CommonModule,
    SharedModule,
    HeaderModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutsComponent,
        children: [
          { 
            path: 'home', component: DashboardComponent
          },
          {
            path: 'users',
            loadChildren: "../../users/users.module#UsersModule"
          }
        ]
      },
    ]),
  ],
  declarations: [
    LayoutsComponent,
    SidenavComponent,
    DashboardComponent
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
