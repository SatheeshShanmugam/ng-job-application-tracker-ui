import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/// BaseService is a generic service that provides basic CRUD operations for any entity type T.
@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  
  constructor(protected http: HttpClient,  @Inject('BASE_URL') protected baseUrl: string) {}
/// The base URL for the API is set in the constructor using dependency injection.
  getAll(endpoint:string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }  

  Add(item: T,endpoint:string): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, item);
  }

  update(item: T[], endpoint:string): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, item);
  }  
}