import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    protected http: HttpClient
  ) { }

  getAllTasks(): Observable<any> {
    let route = [environment.apiUrl, 'task'].join('/');
    return this.http.get(route);
  }

  getTasksByListId(listId: number): Observable<any> {
    let route = [environment.apiUrl, 'task', 'list', listId].join('/');
    return this.http.get(route);
  }

  addTask(task: any): Observable<any> {
    let route = [environment.apiUrl, 'task'].join('/');
    return this.http.post(route, task);
  }

  editTask(task: any, id: any): Observable<any> {
    let route = [environment.apiUrl, 'task', id].join('/');
    return this.http.put(route, task);
  }

  deleteTask(id: any): Observable<any> {
    let route = [environment.apiUrl, 'task', id].join('/');
    return this.http.delete(route);
  }
}
