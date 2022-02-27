import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {

  public chatSubject = new BehaviorSubject("live-chats");
  public chatSubject$ = this.chatSubject.asObservable();
  public selectedChat = new Subject();
  public selectedChat$ = this.selectedChat.asObservable();
  public selectedClient = new Subject();
  public selectedClient$ = this.selectedClient.asObservable();

  constructor(private httpClient : HttpClient) { }

  getAllChats():Observable<any>{
    return this.httpClient.get(environment.endPoint+"api/agentchats");
  }

  getAllAssignedChats():Observable<any>{
    return this.httpClient.get(environment.endPoint+"api/smsalert");
  }

  getMessageOfConversation():Observable<any>{
    return this.httpClient.get(environment.endPoint+"message");
  }

  getOldConversations():Observable<any>{
    return this.httpClient.get(environment.endPoint+"api/agentchats");
  }

  sendChatPageInfo(page:string){
    this.chatSubject.next(page);
  }

}
