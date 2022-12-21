import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  {
    path:'admin',
    // canActivate: [AdminGuard],
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
  path: '',
    loadChildren: ()=> import('./login-admin/login-admin.module').then(m => m.LoginAdminModule),  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
