import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'token';
  private usernameKey = 'username';
  private userIdKey = 'userId'

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3001/user/login', { email, password });
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

  getUserId():string | null{
    return localStorage.getItem(this.userIdKey);
  }

  setUserId(userId:string):void{
    localStorage.setItem(this.userIdKey,userId)
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
    localStorage.removeItem(this.userIdKey)
  }
}
