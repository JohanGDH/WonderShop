import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/productService/product.service';
import { AuthService } from './services/authService/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ProductService,
    AuthService,
  ],
})
export class CoreModule { }
