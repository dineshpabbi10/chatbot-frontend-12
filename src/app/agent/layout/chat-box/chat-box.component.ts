import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  private SOCKET_URL = "wss://34.131.139.183:4444/ws/chatroom/1/";
  public chatInput = new FormControl('',[Validators.required])

  constructor(public socketService: WebSocketService) { 
    this.socketService.openWebSocketConnection(this.SOCKET_URL);
  }

  ngOnInit(): void {
    this.getChatHistory();
    this.socketService.socketResponseSubject$.subscribe((res)=>{
      console.log("Hello res",res);
    })
  }

  sendSocketMessage(){
    let data = {
      "payload": {
          "msg": this.chatInput.value,
          "username": this.chatInput.value.substring(0,4)
      },
      "type": "chat_message",
      "from": "agent"
    }

    this.socketService.sendWebSocketMessage(data);
    this.chatInput.setValue("");
  }

  getChatHistory(){
    let data = {
      "type": "chat_history",
      "payload": {
          "data": []
      },
      "from": "user",
      "to": "agent"
    }
    this.socketService.sendWebSocketMessage(data);
  }

}
