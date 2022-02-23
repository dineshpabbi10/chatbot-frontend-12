import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public webSocket : WebSocket | null = null;
  public socketResponseSubject = new Subject();
  public socketResponseSubject$ =  this.socketResponseSubject.asObservable();

  constructor() { }

  public openWebSocketConnection(SOCKET_URL : string){
    this.webSocket = new WebSocket(SOCKET_URL);

    this.webSocket.onopen = (event)=>{
      console.log("Connection Established with Socket");
    }

    this.webSocket.close = (event)=>{
      console.log("Connection stoped with Socket");
    }

    this.webSocket.onmessage = (event)=>{
      this.socketResponseSubject.next(JSON.parse(event.data));
    }

    this.webSocket.onerror = (event)=>{
      console.log("Error occured while processing Socket Request");
    }
  }

  public sendWebSocketMessage(data : any){
    this.webSocket?.send(JSON.stringify(data));
  }

  public closeWebSocket(){
    this.webSocket?.close();
  }


}
