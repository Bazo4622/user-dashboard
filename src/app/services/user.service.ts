import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, any>();
  public totalPages: number = 2;
  public maxId: number = 12;
  public loading: boolean = false;

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    this.loading = true;
    const response = this.http.get(`${this.apiUrl}?page=${page}&delay=1`);
    response.subscribe({
      next: (response: any) => {
        this.loading = false;
        this.totalPages = response.total_pages;
        this.maxId = response.total;
      }
    });
    return response;
  }

  getUser(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    } else {
      this.loading = true;
      const response = this.http.get(`${this.apiUrl}/${id}?delay=2`).pipe(
        tap(response => this.userCache.set(id, response))
      );
      response.subscribe({
        next: () => this.loading = false
      });
      return response;
    }
  }
}