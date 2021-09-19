import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/productService/product.service';
import { AuthService } from './services/authService/auth.service';
import { UserService } from './services/userService/user.service';


import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ProductService,
    AuthService,
    CookieService,
    UserService,
    AuthInterceptor
  ],
})
export class CoreModule { }
