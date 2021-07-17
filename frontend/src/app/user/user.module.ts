import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
