import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { LoginAdminRoutingModule } from './login-admin-routing.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { AuthService } from '../core/services/authService/auth.service';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginAdminRoutingModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginAdminModule { }
