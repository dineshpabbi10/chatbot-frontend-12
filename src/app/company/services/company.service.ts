import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // quicklinks array : to preserve entered values
  private quickLinks: string[] = [];
  private userMessages: string[] = [];
  private responseMessages: string[] = [];

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

  getDomainList(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + "domain").pipe()
  }

  createDomain(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "domain", data).pipe()
  }

  addQuickLink(link:string):void{
    this.quickLinks.push(link);
  }

  getQuickLinks():string[]{
    return this.quickLinks;
  }

  removeQuickLink(index:number):void{
    this.quickLinks.splice(index,1);
  }

  clearQuickLink():void{
    this.quickLinks = [];
  }

  addResponseMessages(link:string):void{
    this.responseMessages.push(link);
  }

  getResponseMessages():string[]{
    return this.responseMessages;
  }

  removeResponseMessages(index:number):void{
    this.responseMessages.splice(index,1);
  }

  clearResponseMessages():void{
    this.responseMessages = [];
  }

  
  addUserMessages(link:string):void{
    this.userMessages.push(link);
  }

  getUserMessages():string[]{
    return this.userMessages;
  }

  removeUserMessages(index:number):void{
    this.userMessages.splice(index,1);
  }

  clearUserMessages():void{
    this.userMessages = [];
  }

  checkDuplicateInArray(arrayVar:string[],valueVar:string){
    return arrayVar.includes(valueVar);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }



}
