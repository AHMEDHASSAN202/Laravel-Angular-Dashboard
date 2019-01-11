import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

import {
   MatButtonModule,
   MatCheckboxModule,
   MatGridListModule,
   MatInputModule,
   MatIconModule,
   MatFormFieldModule,
  } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from '../messages/messages.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  declarations: [LoginComponent, MessagesComponent],
  exports: [RouterModule]
})
export class LoginModule { }
