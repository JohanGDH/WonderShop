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
    
      if(user && token) {
        console.log(typeof this.authService.getToken());
        console.log(typeof this.authService.loadSessionData().token);
      }

    if (!user || !token) {
      this.authService.removeCurrentSession();
      console.log('NO AUTORIZADO');
      this.authService.logout();
      return false
    }

    if (!(token == user.token)) {
      this.authService.removeCurrentSession();
      console.log('NO AUTORIZADO 2');
      this.authService.logout();      
      return false;
    }

    return true;
  }

}
