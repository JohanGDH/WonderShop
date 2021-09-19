import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(
    private authService: AuthService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.authService.loadSessionData()
    let token = this.authService.getToken();
    
    if (!user || !token) {
      this.authService.removeCurrentSession();      
      this.authService.logout();
      return false
    }

    if (!(token == user.token)) {
      this.authService.removeCurrentSession();
      this.authService.logout();      
      return false;
    }

    return true;
  }

}
