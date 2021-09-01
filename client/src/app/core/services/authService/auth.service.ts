import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Session } from '../../models/session.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:6969/API/login';
  }

  login(credentials: Partial<User>): Observable<Session> {
    return this.http.post(this.url, credentials).pipe(map(this.extractData));
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }
}
