import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  // quicklinks array : to preserve entered values
  private quickLinks: string[] = [];
  private userMessages: string[] = [];
  private responseMessages: string[] = [];
  private entityWords: string[] = [];

  // Selected Records Subject to emit values
  private selectedRecord : Subject<any> = new Subject<any>();
  public selectedRecord$ = this.selectedRecord.asObservable();




  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json'
    }),
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  getDomainList(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + 'domain').pipe();
  }

  createDomain(data: any): Observable<any> {
    return this.httpClient
      .post<any>(environment.endPoint + 'domain', data)
      .pipe();
  }

  createQuickLink(data:any): Observable<any>{
    return this.httpClient.post<any>(environment.endPoint+"quick",data);
  }

  getQuickLinkFromBackend(domain:string): Observable<any>{
    return this.httpClient.get<any>(environment.endPoint+"quick?domain="+domain);
  }

  getReport(data:any):Observable<any>{
    return this.httpClient.post<any>(environment.endPoint+"conversation",data);
  }

  getHumanAgents():Observable<any>{
    return this.httpClient.get<any>(environment.endPoint+"api/human-agents");
  }

  createAgent(data:any):Observable<any>{
    return this.httpClient.post<any>(environment.endPoint+"registration/human/",data);
  }

  getIntentList(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + 'intent');
  }

  createIntent(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + 'intent', data);
  }

  getEntitiesList(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + 'entity');
  }

  createEntity(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + 'entity', data);
  }

  uploadFile(data:any):Observable<any>{
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.httpClient.post<any>(environment.endPoint+"file",data,{headers});
  }

  generateScript(data:any):Observable<any>{
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.httpClient.post<any>(environment.endPoint+"domaintokens",data);
  }
  
  getWebsiteTokens():Observable<any>{
    return this.httpClient.get<any>(environment.endPoint+"domaintokens");
  }

  addQuickLink(link: string): void {
    this.quickLinks.push(link);
  }

  getQuickLinks(): string[] {
    return this.quickLinks;
  }

  removeQuickLink(index: number): void {
    this.quickLinks.splice(index, 1);
  }

  clearQuickLink(): void {
    this.quickLinks = [];
  }

  addResponseMessages(link: string): void {
    this.responseMessages.push(link);
  }

  getResponseMessages(): string[] {
    return this.responseMessages;
  }

  removeResponseMessages(index: number): void {
    this.responseMessages.splice(index, 1);
  }

  clearResponseMessages(): void {
    this.responseMessages = [];
  }

  addUserMessages(link: string): void {
    this.userMessages.push(link);
  }

  getUserMessages(): string[] {
    return this.userMessages;
  }

  removeUserMessages(index: number): void {
    this.userMessages.splice(index, 1);
  }

  clearUserMessages(): void {
    this.userMessages = [];
  }

  //
  addEntityWords(link: string): void {
    this.entityWords.push(link);
  }

  getEntityWords(): string[] {
    return this.entityWords;
  }

  removeEntityWords(index: number): void {
    this.entityWords.splice(index, 1);
  }

  clearEntityWords(): void {
    this.entityWords = [];
  }

  sendSelectedRecord(component:string,action:string,payload:any):void{
    this.selectedRecord.next({
      component,
      action,
      payload
    });
  }

  checkDuplicateInArray(arrayVar: string[], valueVar: string) {
    return arrayVar.includes(valueVar);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  arraySizeValidator() : ValidatorFn{
    return (control: AbstractControl) => {
    let isValid = control.value.length > 0 ? true : false;
    console.log(isValid);
    return isValid ? null : { arraySize: true };
  }};

  passwordMatchValidator():ValidatorFn {
    return (form:AbstractControl)=>{
      const password = form.get('password1');
      const confirmPassword = form.get('password2');
      let isValid = password?.value === confirmPassword?.value;
      return isValid ? null : {confirmPasswordError:true};
    }
  }
}
