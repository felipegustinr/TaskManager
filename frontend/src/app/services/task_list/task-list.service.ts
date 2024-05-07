import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(
    protected http: HttpClient
  ) { }

  getAllTaskLists(): Observable<any> {
    let route = [environment.apiUrl, 'task_list'].join('/');
    return this.http.get(route);
  };
  getTaskListById(id: any): Observable<any> {
    let route = [environment.apiUrl, 'task_list', id].join('/');
    return this.http.get(route);
  };
  addTaskList(task_list: any): Observable<any> {
    let route = [environment.apiUrl, 'task_list'].join('/');
    return this.http.post(route, task_list);
  };
  editTaskList(task_list: any, id: any): Observable<any> {
    let route = [environment.apiUrl, 'task_list', id].join('/');
    return this.http.put(route, task_list);
  };
  deleteTaskList(id: any): Observable<any> {
    let route = [environment.apiUrl, 'task_list', id].join('/');
    return this.http.delete(route);
  }
}
