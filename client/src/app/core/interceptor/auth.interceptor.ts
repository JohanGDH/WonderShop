import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService  } from '../services/authService/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token:string = this.authService.getToken();
    let request = req;

    if(token) {
      request = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next
      .handle(request)
      .pipe(catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          this.authService.logout()
        }

        return throwError(`${err.name}: ${err.status} (${err.statusText}) `);
      })
      );
  }
}
