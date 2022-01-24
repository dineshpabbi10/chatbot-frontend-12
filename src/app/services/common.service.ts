import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json'
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  signup(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "registration/company/", data)
      .pipe()
  }

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "login", data).pipe()
  }

  countriesList(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + "api/country").pipe()
  }

  logout(data: any) {
    return this.httpClient.post<any>(environment.endPoint + "api/logout/", data).pipe()
  }

  getAllPricingPlans() {
    return this.httpClient.get<any>(environment.endPoint + "api/pricing").pipe()
  }

  

}
