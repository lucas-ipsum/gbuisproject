import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

// Angular Service zum aufrufen der REST API
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  @Output() userLoggedIn: EventEmitter<boolean> = new EventEmitter();
  endpoint: string = 'http://167.99.240.125/api/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  checkLogin: boolean;

  constructor(private http: HttpClient, public router: Router) { }

  // Add User
  AddUser(data: User): void {
    let API_URL = `${this.endpoint}/add-user`;
    this.http.post(API_URL, data).subscribe(() => catchError(this.errorMgmt))
  }

  GetUser() {
    return this.http.get(`${this.endpoint}/get-user`);
  }
  // Delete
  DeleteUser(username): void {
    const API_URL = `${this.endpoint}/delete-user/${username}`;
    this.http.delete(API_URL).subscribe(() => catchError(this.errorMgmt))
  }

  //get logged in user
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  GetUserByName(name): Observable<any> {
    const API_URL = `${this.endpoint}/get-user/${name}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Update User
  UpdateUser(username, data): void {
    let API_URL = `${this.endpoint}/update-user/${username}`;
    this.http.put(API_URL, data).subscribe(() => catchError(this.errorMgmt))
  }

  // Register User
  registerUser(body: any) {
    let API_URL = `${this.endpoint}/register`;
    return this.http.post(API_URL, body, {
      observe: 'body',
    })
  }

  // Login User
  loginUser(body: any) {
    let API_URL = `${this.endpoint}/login-user`;
    return this.http.post(API_URL, body, {
      observe: 'body'
    })
  }

  // Get Logged in user
  getLoggedInUser() {
    let API_URL = `${this.endpoint}/username`;
    return this.http.get(API_URL, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
