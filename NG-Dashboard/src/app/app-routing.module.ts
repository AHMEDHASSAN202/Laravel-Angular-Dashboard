import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
    {
      canLoad: [ GuestGuard ],
      path: 'login',
      loadChildren: './login/login.module#LoginModule'
    },
    {
      path: 'dashboard',
      canLoad: [ AuthGuard ],
      loadChildren: './Layouts/dashboard/dashboard.module#DashboardModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ])],
  declarations: [NotFoundComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
