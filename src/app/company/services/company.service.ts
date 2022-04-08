import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable, Subject, throwError } from 'rxjs';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

function _window(): any {
  return window;
}
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
  private selectedRecord: Subject<any> = new Subject<any>();
  public selectedRecord$ = this.selectedRecord.asObservable();

  // Send message for reload
  private sendSuccess: Subject<any> = new Subject<any>();
  public sendSuccess$ = this.sendSuccess.asObservable();




  constructor(private httpClient: HttpClient) { }

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



  get nativeWindow(): any {
    return _window();
  }

  getDomainList(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + 'domain').pipe();
  }

  createDomain(data: any): Observable<any> {
    return this.httpClient
      .post<any>(environment.endPoint + 'domain', data)
      .pipe();
  }

  createQuickLink(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "quick", data);
  }

  getQuickLinkFromBackend(domain: string): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + "quick?domain=" + domain);
  }

  getReport(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "conversation", data);
  }

  getHumanAgents(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + "api/human-agents");
  }

  createAgent(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "registration/human/", data);
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

  uploadFile(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.httpClient.post<any>(environment.endPoint + "file", data, { headers });
  }

  generateScript(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.httpClient.post<any>(environment.endPoint + "domaintokens", data);
  }

  getWebsiteTokens(): Observable<any> {
    return this.httpClient.get<any>(environment.endPoint + "domaintokens");
  }

  deleteDomain(data: any): Observable<any> {
    return this.httpClient.delete<any>(environment.endPoint + "domain", { body: data });
  }

  deleteEntity(data: any): Observable<any> {
    delete data["id"];
    return this.httpClient.delete<any>(environment.endPoint + "entity", { body: data });
  }

  submitUpdate(component: string, data: any) {
    if (component === "domain") {
      return this.httpClient.put<any>(environment.endPoint + "domain", data);
    } else if (component === "entity") {
      return this.httpClient.put<any>(environment.endPoint + "entity", data);
    } else if (component === "intents") {
      return this.httpClient.put<any>(environment.endPoint + "intent", data);
    } else if (component === "web-link") {
      return this.httpClient.put<any>(environment.endPoint + "domainTokens", data);
    }
    return null;
  }

  deleteIntent(data: any): Observable<any> {
    delete data["id"];
    return this.httpClient.delete<any>(environment.endPoint + "intent", { body: data });
  }

  deleteWebLinToken(token: string): Observable<any> {
    return this.httpClient.delete<any>(environment.endPoint + "domaintokens/" + token);
  }

  changePassword(body: any): Observable<any> {
    return this.httpClient.post<any>(environment.endPoint + "changepass", body);
  }


  getTrainHistory(){
    return this.httpClient.get<any>(environment.endPoint+"trainstatus");
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

  sendSelectedRecord(component: string, action: string, payload: any): void {
    this.selectedRecord.next({
      component,
      action,
      payload
    });
  }

  sendSuccessMessage(message: any): void {
    this.sendSuccess.next(message);
  }

  checkDuplicateInArray(arrayVar: string[], valueVar: string) {
    return arrayVar.includes(valueVar);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  arraySizeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      let isValid = control.value.length > 0 ? true : false;
      console.log(isValid);
      return isValid ? null : { arraySize: true };
    }
  };

  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl) => {
      const password = form.get('password1');
      const confirmPassword = form.get('password2');
      let isValid = password?.value === confirmPassword?.value;
      return isValid ? null : { confirmPasswordError: true };
    }
  }

  getDashboardPieData() {
    return this.httpClient.get<any>(environment.endPoint + "api/piechart").pipe();
  }

  getDashboardGraphData() {
    return this.httpClient.get<any>(environment.endPoint + "api/graph").pipe()
  }

  getNumberData() {
    return this.httpClient.get<any>(environment.endPoint + "api/number").pipe()
  }

  payment(body: any) {
    return this.httpClient.post<any>(environment.endPoint + "payment", body).pipe()
  }

  getBotSetting(device_token: string) {
    return this.httpClient.get<any>(environment.endPoint + "api/botcustom?token=" + device_token).pipe()
  }

  updateBotSettings(body: any) {
    return this.httpClient.post<any>(environment.endPoint + "api/botcustom", body).pipe()
  }

  getTransactions() {
    return this.httpClient.get<any>(environment.endPoint + "api/transactions").pipe()
  }


  getMyPlan() {
    return this.httpClient.get<any>(environment.endPoint + "myplan").pipe()
  }
  

  updateCompanyUserDetails(data:any):Observable<any>{
    // Build Form Data
    const formData = new FormData();
    if(data.profile_pic){
      formData.append('profile_pic', data.profile_pic);
    }
    formData.append('first_name',data.first_name);
    formData.append('last_name',data.last_name);
    formData.append('mobile_no',data.mobile_no);

    console.log(data);

    // Set headers
    let headers = new HttpHeaders();
    headers.set('Accept', "multipart/form-data");
    return this.httpClient.post(environment.endPoint+"userprofile",formData,{headers});
  }

  getCompanyUserDetails():Observable<any>{
    return this.httpClient.get(environment.endPoint+"userprofile");
  }

  trainBot(token:any){
    return this.httpClient.get(environment.endPoint+"intenttrain?token="+token);
  }


}
