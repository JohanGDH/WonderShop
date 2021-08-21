import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './nav/nav.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductService } from '../core/services/productService/product.service.service';


@NgModule({
  declarations: [
    NavComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
  ],
  providers: [
    ProductService
  ]
})
export class AdminModule { }
