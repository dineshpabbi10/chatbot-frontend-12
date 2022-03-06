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

  getAllAssignedChats(type:string):Observable<any>{
    return this.httpClient.get(environment.endPoint+"api/smsalert?type="+type);
  }

  getMessageOfConversation():Observable<any>{
    return this.httpClient.get(environment.endPoint+"message");
  }

  getOldConversations():Observable<any>{
    return this.httpClient.get(environment.endPoint+"api/agentchats");
  }

  getAllAgentsList():Observable<any>{
    return this.httpClient.get(environment.endPoint+"api/human-agents");
  }

  sendChatPageInfo(page:string){
    this.chatSubject.next(page);
  }

  transferChat(data:any):Observable<any>{
    return this.httpClient.post(environment.endPoint+"api/transfer",data);
  }

}
