import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanySocketService {

  public webSocket: WebSocket | null = null;
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
    }

    this.webSocket.close = (event) => {
    }

    this.webSocket.onmessage = (event) => {
      this.socketResponseSubject.next(JSON.parse(event.data));
    }

    this.webSocket.onerror = (event) => {
      this.socketCloseSubject.next({
        status: 404,
        message: "Success"
      });
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
