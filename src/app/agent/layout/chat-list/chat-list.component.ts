import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AgentServiceService } from '../../services/agent-service.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
  public chatlist: any[] = [];
  public selectedChatList: string = '';
  public selectedChat: number | string = 0;
  public agentEmail = '';
  public allChats: any = null;

  constructor(
    private agentService: AgentServiceService,
    public socketService: WebSocketService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('data') !== null) {
      let name: any = JSON.parse(localStorage.getItem('data') || '{}');
      this.agentEmail = name.email;
    }

    this.agentService.chatSubject$.subscribe((selectedChatList) => {
      this.getChatList(selectedChatList);
      console.log(selectedChatList);
      
        if (selectedChatList === 'live-chats') {
          this.getChatList(selectedChatList);
        } else if (selectedChatList === 'incoming-chats') {
          this.getChatList(selectedChatList);
        } else if (selectedChatList === 'resolved-chats') {
          this.getChatList(selectedChatList);
        }
    });

  }

  getChatList(chatType: string) {
    this.loader.start();
    if (chatType === 'resolved-chats') {
      this.agentService
        .getOldConversations()
        .pipe(
          catchError((err) => {
            this.toast.error(err.message);
            return of(err);
          })
        )
        .subscribe((response) => {
          if (response.status) {
            this.chatlist = response.data;
            this.setSelectedRoom(this.chatlist[0].id);
            this.sendSelectedRoom(
              this.chatlist[0]?.user_id?.split('-')?.join('')
            );
            this.setSelectedClient(this.chatlist[0].client);
          }
          this.setPage(chatType);
          this.loader.stop();
        });
    } else if (chatType === 'unresolved-chats') {
      this.agentService
        .getOldConversations()
        .pipe(
          catchError((err) => {
            this.toast.error(err.message);
            return of(err);
          })
        )
        .subscribe((response) => {
          if (response.status) {
            this.chatlist = response.data;
            this.setSelectedRoom(this.chatlist[0].id);
            this.sendSelectedRoom(
              this.chatlist[0]?.user_id?.split('-')?.join('')
            );
            this.setSelectedClient(this.chatlist[0].client);
          }
          this.setPage(chatType);
          this.loader.stop();
        });
    } else{
        this.agentService
        .getAllAssignedChats(chatType === "live-chats" ? "live" : "incomming")
        .pipe(
          catchError((err) => {
            this.toast.error(err.message);
            return of(err);
          })
        )
        .subscribe((response) => {
          if (response.status) {
            this.chatlist = response.data;
            this.setSelectedRoom(this.chatlist[0]?.room_code);
            this.sendSelectedRoom(this.chatlist[0]?.room_code);
            this.setSelectedClient(this.chatlist[0]?.username);
          }
          this.setPage(chatType);
          this.loader.stop();
        });
    }

    this.setPage(chatType);
    this.loader.stop();
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

  setSelectedRoom(id: number | string) {
    this.selectedChat = id;
  }

  sendSelectedRoom(id: any) {
    this.agentService.selectedChat.next(id);
  }

  setSelectedClient(name: string) {
    this.agentService.selectedClient.next(name);
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
}
