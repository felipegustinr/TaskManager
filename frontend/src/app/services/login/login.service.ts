import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'token';
  private usernameKey = 'username';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user/login', { email, password });
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getUsername(): string {
    return localStorage.getItem(this.usernameKey) ?? '';
  }

  setUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
  }
}
