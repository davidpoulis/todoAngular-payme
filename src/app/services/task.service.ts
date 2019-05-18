import { Injectable } from '@angular/core';
import { Task } from '../shared/task';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient,
    public auth: AuthService,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getTasks(): Observable<any[]> {
    if (!this.auth.isLoggedIn()) {
      return null;
    }
    return this.http.get<any[]>(baseURL + 'tasks')
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  postTask(task: any): Observable<any>{
    return this.http.post<Task>(baseURL + 'tasks', task)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

 

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(baseURL + 'tasks/' + id)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(baseURL + 'tasks/' + id)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }
}
