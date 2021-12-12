import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  
	url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:6969/API/login/';
  }

  sendRecoveryEmail(email: string): Observable<any> {
    return this.httpClient
      			.post(`${this.url}recovery`, email)
      			.pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError('Ups algo salio mal ' + error.name + ' ' + error.message);
  }
}
