import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    protected http: HttpClient
  ) { }

  getAllUsers(): Observable<any> {
    let route = [environment.apiUrl, 'user'].join('/');
    return this.http.get(route);
  };
  getUserById(id: any): Observable<any> {
    let route = [environment.apiUrl, 'user', id].join('/');
    return this.http.get(route);
  };
  addUser(user: any): Observable<any> {
    let route = [environment.apiUrl, 'user'].join('/');
    return this.http.post(route,user);
  };
  editUser(user: any, id: any): Observable<any> {
    let route = [environment.apiUrl, 'user', id].join('/');
    return this.http.put(route, user);
  };
  deleteUser(id: any): Observable<any> {
    let route = [environment.apiUrl, 'user', id].join('/');
    return this.http.delete(route);
  }
}
