import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, takeLast } from 'rxjs/operators';
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
  public SOCKET_URL = 'wss://34.131.139.183:4444/ws/chatroom/';
  public chatInput = new FormControl('', [Validators.required]);
  public chatList: any[] | null = null;
  public clientName: any = '';
  @ViewChild('target') private chatListContainer: ElementRef;
  public selectedChatList: string = '';
  public file: File | null = null;
  public display = false;
  public agentEmail = '';
  public actionsDisplay = false;
  public agentList: any[] = [];
  public agentTransferDisplay = false;
  public selectedAgent = new FormControl(null,Validators.required);
  public selectedFile:any = null;

  @ViewChild("form")
  private picUpload: any;

  constructor(
    public socketService: WebSocketService,
    public agentService: AgentServiceService,
    public loader: NgxUiLoaderService,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllAgentsList();

    if (localStorage.getItem('data') !== null) {
      let name: any = JSON.parse(localStorage.getItem('data') || '{}');
      this.agentEmail = name.email;
    }

    this.loader.start();

    this.agentService.chatSubject$.subscribe((selectedChatList) => {
      this.setPage(selectedChatList);
    });

    this.agentService.selectedClient$.subscribe((data: any) => {
      this.clientName = data;
    });

    this.socketService.socketCloseSubject$.subscribe((error) => {
      console.log('RECONNECTING');
      setTimeout(() => {
        this.socketService.openWebSocketConnection(this.SOCKET_URL);
      }, 10000);
    });

    this.agentService.selectedChat$.subscribe((index: any) => {
      this.chatList = null;
      this.chat_id = index;
      if(index !== undefined){
        this.SOCKET_URL = this.SOCKET_URL_BASE + this.chat_id + '/';
        console.log('OPENING CONNECTION AT ', this.SOCKET_URL);
        this.socketService.openWebSocketConnection(this.SOCKET_URL);
      }else{
        this.chatList = [];
      }
    });

    this.socketService.socketResponseSubject$.subscribe((res: any) => {
      if (res.type === 'chat_history') {
        if(this.chat_id !== undefined){
          this.chatList = res.payload.data;
        }
        setTimeout(() => this.scrollToElement(), 500);
      } else if (res.type === 'chat_message' || res.type === 'botquery') {
        this.getChatHistory();
        setTimeout(() => this.scrollToElement(), 500);
      } else if (res.type === 'live_chats') {
      } else if (res.type === 'hold') {
        this.toast.success(res?.payload?.msg);
        this.agentService.transferSuccess.next({
          msg:'success'
        });
      } else if (res.type === 'banuser') {
        this.toast.success(res?.payload?.msg);
        this.closeChat();
      }else if(res.type === 'botattachment'){
        this.getChatHistory();
        setTimeout(() => this.scrollToElement(), 500);
      } 
      else {
        console.log(res);
        this.scrollToElement();
      }
      this.loader.stop();
    });

    this.socketService.socketConnectionSubject$.subscribe((data: any) => {
      this.chatList = null;
      setTimeout(() => this.getChatHistory(), 2000);
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
    console.log('GETTING MESSAGE');
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
    console.log('GETTING HISTORY');
    this.socketService.sendWebSocketMessage(data);
  }

  closeChat() {
    let data = {
      payload: {},
      type: 'chat_close',
      from: 'agent',
    };
    this.socketService.sendWebSocketMessage(data);
    setTimeout(() =>   this.agentService.transferSuccess.next({
      msg:'success'
    }), 2000);
    this.agentService.selectedChat.next(undefined);
  }

  sendAttachment(file: any) {
    var fr = new FileReader();
    let component = this;
    fr.addEventListener("loadend", function () {
        let [type, extension] = file.type.split('/');
        // send the file over web sockets
        let data = {
            type: 'botattachment',
            from: 'agent',
            payload: {
                name: file.name,
                attachment: fr.result,
                type: type == 'application' ? 'document' : type,
                extension: extension,
            }
        }
        // console.log('Sending message on socket', data);
        // chatSocket.send(JSON.stringify(data));
        component.socketService.sendWebSocketMessage(data);
        component.picUpload.clear();
        component.closeDialog();
        // setTimeout(()=>component.getChatHistory(),5000);
    });
    fr.readAsDataURL(file);
  }

  createHold() {
    let data = { type: 'hold', payload: { msg: 'hold' }, from: 'agent' };

    this.socketService.sendWebSocketMessage(data);
    setTimeout(() =>   this.agentService.transferSuccess.next({
      msg:'success'
    }), 1000);
  }

  createUnHold() {
    let data = { type: 'hold', payload: { msg: 'unhold' }, from: 'agent' };

    this.socketService.sendWebSocketMessage(data);
    setTimeout(() =>   this.agentService.transferSuccess.next({
      msg:'success'
    }), 1000);
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

  setPage(selectedChatList: string) {
    if (selectedChatList === 'live-chats') {
      this.selectedChatList = 'Live Chat';
    } else if (selectedChatList === 'incoming-chats') {
      this.selectedChatList = 'Incoming Chat';
    } else if (selectedChatList === 'resolved-chats') {
      this.selectedChatList = 'Resolved Chat';
    } else if (selectedChatList === 'unresolved-chats') {
      this.selectedChatList = 'Unresolved Chat';
    }
  }

  myUploader(event: any) {
    // console.log(event.files);
    let file = event.files[0];
    this.selectedFile = file;
    // this.sendAttachment(file,form);
    // form.clear();
    // this.closeDialog();
  }

  uploadFile(){
    if(this.selectedFile){
      this.sendAttachment(this.selectedFile);
    } 
  }

  clearFile(){
    this.selectedFile = null;
  }

  openDialog() {
    this.display = true;
  }

  closeDialog() {
    this.selectedFile = null;
    this.picUpload.clear();
    this.display = false;
  }

  getChatListBySocket() {
    let data = {
      type: 'live_chats',
      payload: { agent_email: this.agentEmail },
      from: 'agent',
    };
    console.log('SENDING LIVE CHAT MESSAGE');
    this.socketService.sendWebSocketMessage(data);
  }

  openActionDisplay() {
    this.actionsDisplay = true;
  }

  getAllAgentsList() {
    this.agentService
      .getAllAgentsList()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        if (res.status) {
          this.agentList = res?.data?.online.map((elem: any) => {
            return { name: elem?.name, code: elem?.username };
          });
          console.log(this.agentList);
        }
      });
  }

  openTransferAgent() {
    this.agentTransferDisplay = true;
  }

  transferChat() {
    let data = {
      mobile: this.chat_id,
      new_agent: this.selectedAgent.value?.code,
      message: 'transfer msg by agent',
    };
    console.log(data);
    this.agentService.transferChat(data).
    pipe(
      catchError(err=>{
        this.toast.error(err.msg);
        return of(err.message);
      })
    )
    .subscribe(res=>{
      if(res.status){
        this.toast.success(res.message);
        this.agentService.transferSuccess.next({
          msg:'success'
        });
        this.agentTransferDisplay = false;
      }
    });
  }
}
