import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Buis_Info } from './buis_info';

@Injectable({
  providedIn: 'root'
})
export class BuisInfoService {
  endpoint: string = 'http://167.99.240.125/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add
  AddBuisInfo(data: Buis_Info): Observable<any> {
    let API_URL = `${this.endpoint}/buis/info/add-buis`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Delete 
  DeleteBuis(name): void{
    var API_URL = `${this.endpoint}/buis/info/delete-buis/${name}`;
    this.http.delete(API_URL).subscribe(() => catchError(this.errorMgmt));
  }

  GetBuisInfo() {
    return this.http.get(`${this.endpoint}/buis/info`);
  }

  // Get BUIS by name
  GetBuisByName(name): Observable<any> {
    const API_URL = `${this.endpoint}/buis/info/${name}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }
    // Update BUIS Info
    UpdateBuisInfo(name, data): void{
      let API_URL = `${this.endpoint}/buis/info/update-buis/${name}`;
      this.http.put(API_URL, data).subscribe(() => catchError(this.errorMgmt));
    }

  // Error handling 
  // TODO [LT]: Part ist doppelt. Aus Api Service verwenden?
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