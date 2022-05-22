import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public notificationSubject: Subject<any> = new Subject();
  public notificationSubject$ = this.notificationSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json'
      'Authorization': 'Bearer ' + localStorage.getItem('company_token')
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
    console.log(this.httpOptions)
    return this.httpClient.post<any>(environment.endPoint + "api/logout/", data, this.httpOptions).pipe()
  }

  getAllPricingPlans() {
    return this.httpClient.get<any>(environment.endPoint + "api/pricing").pipe()
  }

  forgetPassword(body: any) {
    return this.httpClient.post<any>(environment.endPoint + 'api/password_reset/', body).pipe()
  }

  resetPassword(body: any, token: any) {
    return this.httpClient.post<any>(environment.endPoint + 'api/passwordreset?token=' + token, body).pipe()
  }

  subscribeaPlan(body: any) {
    return this.httpClient.post<any>(environment.endPoint + 'api/subscription', body, this.httpOptions).pipe()
  }

  subscribePlanWithPayment(body: any) {
    return this.httpClient.put<any>(environment.endPoint + "api/subscription", body, this.httpOptions).pipe()
  }

  contactUs(body: any) {
    return this.httpClient.post<any>(environment.endPoint + 'contactus', body).pipe()
  }

  getCountryUsingIp(): Observable<any> {
    return this.httpClient.get<any>('https://ipapi.co/json/');
  }

  sendNotificationToken(token: string | null): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "pushnotification", { "device_token": token })
  }

  requestForEmailVerification(userId: string, confirmationToken: string) {
    return this.httpClient.get<any>(environment.endPoint + 'activate?user_id=' + userId + '&confirmation_token=' + confirmationToken);
  }

  resendEmailVerificationLink(body: any) {
    return this.httpClient.post<any>(environment.endPoint + "resend_confirmation", body)
  }


}
