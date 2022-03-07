import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

<<<<<<< HEAD
  public webSocket: WebSocket | null = this.openWebSocketConnection('wss://34.131.139.183:4444/ws/chatroom/123/');
=======
  public webSocket : WebSocket | null = null;
>>>>>>> f3a32a85bd313cc4b39034fa3f94a0e8d075b795
  public socketResponseSubject = new Subject();
  public socketResponseSubject$ = this.socketResponseSubject.asObservable();
  public socketConnectionSubject = new Subject();
  public socketConnectionSubject$ = this.socketConnectionSubject.asObservable();
  public socketCloseSubject = new Subject();
  public socketCloseSubject$ = this.socketCloseSubject.asObservable();

  constructor() { }

  public openWebSocketConnection(SOCKET_URL: string) {
    this.webSocket = new WebSocket(SOCKET_URL);

    this.webSocket.onopen = (event) => {
      this.socketConnectionSubject.next({
        status: 200,
        message: "Success"
      });
      console.log("CONNECTION OPENED");
    }

    this.webSocket.close = (event) => {
      console.log("Connection stoped with Socket");
    }

    this.webSocket.onmessage = (event) => {
      this.socketResponseSubject.next(JSON.parse(event.data));
    }

    this.webSocket.onerror = (event) => {
      this.socketCloseSubject.next({
        status: 404,
        message: "Success"
      });
      console.log("Error occured while processing Socket Request");
    }

    return this.webSocket;
  }

  public sendWebSocketMessage(data: any) {
    this.webSocket?.send(JSON.stringify(data));
  }

  public closeWebSocket() {
    this.webSocket?.close();
  }


}
