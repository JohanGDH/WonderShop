import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { NavComponent } from './nav/nav.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: 'add-product',
        component: ProductFormComponent,
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'edit-user/:id',
        component: UserEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
