import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentServiceService } from '../../services/agent-service.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public chat_id = '';
  public SOCKET_URL_BASE = 'wss://34.131.139.183:4444/ws/chatroom/';
  public SOCKET_URL =
    'wss://34.131.139.183:4444/ws/chatroom/6147cd55-a7ee-45d0-8cd1-e35e687a225b/';
  public chatInput = new FormControl('', [Validators.required]);
  public chatList: any[] | null = null;
  public clientName:any = "";
  @ViewChild('target') private chatListContainer: ElementRef;
  public selectedChatList: string = "";
  public file : File | null = null;
  public display = false;

  constructor(
    public socketService: WebSocketService,
    public agentService: AgentServiceService,
    public loader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.loader.start();

    this.agentService.chatSubject$.subscribe((selectedChatList)=>{
      this.setPage(selectedChatList);
    })

    this.agentService.selectedClient$.subscribe((data:any)=>{
      this.clientName = data;
    })

    this.socketService.socketCloseSubject$.subscribe((error) => {
      this.socketService.openWebSocketConnection(this.SOCKET_URL);
    });

    this.agentService.selectedChat$.subscribe((index: any) => {
      this.chatList = null;
      this.chat_id = index;
      this.SOCKET_URL = this.SOCKET_URL_BASE + this.chat_id + '/';
      console.log(this.SOCKET_URL);
      this.socketService.openWebSocketConnection(this.SOCKET_URL);
    });

    this.socketService.socketResponseSubject$.subscribe((res: any) => {
      if (res.type === 'chat_history') {
        this.chatList = res.payload.data;
        this.scrollToElement();
      } else if (res.type === 'chat_message' || res.type === 'botquery') {
          this.getChatHistory();
          this.scrollToElement();
      } else {
        console.log(res);
        this.scrollToElement();
      }
      this.loader.stop();
    });

    this.socketService.socketConnectionSubject$.subscribe((data: any) => {
      this.chatList = null;
      setTimeout(() => this.getChatHistory(), 1000);
    });
  }

  sendSocketMessage() {
    let data = {
      payload: {
        msg: this.chatInput.value,
        agent: '',
      },
      type: 'botquery',
      from: 'agent',
    };

    this.socketService.sendWebSocketMessage(data);
    this.chatInput.setValue('');
  }

  getChatHistory() {
    let data = {
      type: 'chat_history',
      payload: {
        data: [],
      },
      from: 'agent',
      to: 'user',
    };
    this.socketService.sendWebSocketMessage(data);
  }

  closeChat() {
    let data = {
      payload: {},
      type: 'chat_close',
      from: 'agent',
    };
    this.socketService.sendWebSocketMessage(data);
  }

  sendAttachment(file:any) {
    console.log(file);
    let data = {
      payload: {
        attachment: file,
        agent: '',
      },
      type: 'botattachment',
      from: 'agent',
    };

    this.socketService.sendWebSocketMessage(data);
  }

  createHold() {
    let data = {
      payload: {
        msg: this.chatInput.value,
        agent: '',
      },
      type: 'botquery',
      from: 'agent',
    };

    this.socketService.sendWebSocketMessage(data);
  }

  banUser() {
    let data = { type: 'banuser', payload: { msg: '' }, from: 'agent' };

    this.socketService.sendWebSocketMessage(data);
  }

  scrollToElement(): void {
    this.chatListContainer.nativeElement.scroll({
      top: this.chatListContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  checkEnterKey(event: any): void {
    if (event && event.keyCode == 13) {
      this.sendSocketMessage();
    }
  }

  setPage(selectedChatList:string){
    if(selectedChatList === "live-chats"){
      this.selectedChatList = "Live Chat";
    }else if(selectedChatList === "incoming-chats"){
      this.selectedChatList = "Incoming Chat"
    }else if(selectedChatList === "resolved-chats"){
      this.selectedChatList = "Resolved Chat"
    }else if(selectedChatList === "unresolved-chats"){
      this.selectedChatList = "Unresolved Chat"
    }
  }

  myUploader(event:any,form:any) {
    console.log(event.files);
    this.sendAttachment(event.files[0]);
    form.clear();
  }

  openDialog(){
    this.display = true;
  }

  closeDialog(){
    this.display = false;
  }

}
