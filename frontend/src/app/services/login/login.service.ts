import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'token';
  private usernameKey = 'username';
  private userIdKey = 'id';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3001/user/login', { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response); 
        if (response.token) {
          this.setToken(response.token);
        }
        if (response.username) {
          this.setUsername(response.username);
        }
        if (response.id) {
          this.setUserId(response.id);
        } else {
          console.error('User ID is missing in the response');
        }
      })
    );
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

  getUserId(): string {
    return localStorage.getItem(this.userIdKey) ?? '';
  }

  setUserId(id: string): void {
    localStorage.setItem(this.userIdKey, id);
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
    localStorage.removeItem(this.userIdKey);
  }
}
