import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    protected http: HttpClient
    ) { }

    addUser(usr:any):Observable<any>{
      let route = [environment.apiUrl, 'user'].join('/');
      return this.http.post(route,usr);
    }
}
