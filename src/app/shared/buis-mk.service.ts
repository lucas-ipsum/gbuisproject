import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Buis_MK } from './buis_mk';


@Injectable({
  providedIn: 'root'
})
export class BuisMKService {
  endpoint = 'http://167.99.240.125/api/buis/mk';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add
  AddBuisMKInfo(data: Buis_MK): Observable<any> {
    const API_URL = `${this.endpoint}/add-buis-mk`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Delete
  DeleteBuisMK(name): void {
    const API_URL = `${this.endpoint}/delete-buis-mk/${name}`;
    this.http.delete(API_URL).subscribe(() => catchError(this.errorMgmt));
  }

  GetBuisMKInfo() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get BUIS MK by name
  GetBuisMK(name): Observable<any> {
    const API_URL = `${this.endpoint}/get-buis-mk/${name}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

    // Update BUIS
    UpdateBuisMK(name, data): void {
      let API_URL = `${this.endpoint}/buis/mk/update-buis-mk/${name}`;
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
