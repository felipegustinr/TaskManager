import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user/login', { email, password });
  }
  isLoggedIn(): boolean {

    const token = localStorage.getItem('token');
    return !!token;
  }

  getUsername(): string {
    return localStorage.getItem('username') ?? '';
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usename');
  }
}

