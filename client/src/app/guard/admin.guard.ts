import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/authService/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.authService.loadSessionData()
    let token = this.authService.getToken();        
    console.log(user);
    if (!user || !token) {
      this.authService.removeCurrentSession()
      return this.router.navigate(['/login']);  
    }        
    return true;
      
    
  }
  
}
