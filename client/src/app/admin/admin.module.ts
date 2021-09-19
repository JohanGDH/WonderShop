import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './nav/nav.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductService } from '../core/services/productService/product.service';
import { AuthService } from '../core/services/authService/auth.service';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [
    NavComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductListComponent,
    DashboardComponent,
    AddUserComponent,
    UsersListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    AuthService
  ]
})
export class AdminModule { }
