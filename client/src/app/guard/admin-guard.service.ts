import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../core/services/authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return this.authService.loggin().pipe(
  //     map((user) => {
  //       if (!user) {
  //         return this.router.parseUrl('/login');
  //       }
  //       return true;
  //     })
  //   );
  // }
}
