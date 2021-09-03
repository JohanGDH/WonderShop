import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Session } from '../../models/session.model';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url: string;
  private currentSession: Session = null;
  private localStorageService;

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router
  ) {
    this.url = 'http://localhost:6969/API/login';
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  login(credentials: Partial<User>): Observable<any> {
    return this.http.post(this.url, credentials).pipe(map(this.extractData));
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

  setToken(token: string) {
    this.cookies.set('token', token);
  }

  getToken() {
    return this.cookies.get('token');
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem(
      'currentUser',
      JSON.stringify(session.user)
    );
    this.cookies.set('token', session.token);
  }

  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return sessionStr ? <Session>JSON.parse(sessionStr) : null;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return session && session.user ? session.user : null;
  }

  logout(): void {
    this.cookies.delete('token');
    this.router.navigate(['/login']);
  }
}
