import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService  } from '../services/authService/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Session } from '../models/session.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token:string = this.authService.getToken();
    const session: Session = this.authService.loadSessionData();
    let request = req;

    
    if(req.url.includes('upload')) {
      console.log("JIJIJIJA");
      return next.handle(req);
    } 

    if (token && session) {
      if (req.body) console.log(req.body);

      request = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        body: { ...req.body, ActiveUser: session.user.username },
      });
      
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
