import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Session } from '../../models/session.model';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string;
  user: User;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.url = 'http://localhost:6969/API/users/';
  }

  listUsers(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
      .get(this.url, { headers })
      .pipe(catchError(this.handleError));
  }

  getUser(id: string) {
    return this.httpClient.get(`${this.url}${id}`)
    .pipe(catchError(this.handleError));
  }

  updateUser(id:string, changes: Partial<User>) {

    let idUser = '';
    let session = this.authService.loadSessionData();
    
    this.getUser(id).subscribe((res:any) => {
      const user = res.product[0]
      idUser = user.username;
    })

    if(!(idUser == session.user.username)) {
      return 'El usuario no coincide'
    }

    return this.httpClient
      .put(`${this.url}${id}`, changes)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id:string) {
    return this.httpClient
      .delete(`${this.url}${id}`,)
      .pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    return throwError('Ups algo salio mal ' + error.name + ' ' + error.message);
  }
}
