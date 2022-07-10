import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
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
  public selectedChatCode = '';

  constructor(
    private agentService: AgentServiceService,
    public socketService: WebSocketService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private commonService : CommonService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('data') !== null) {
      let name: any = JSON.parse(localStorage.getItem('data') || '{}');
      this.agentEmail = name.email;
    }

    this.agentService.chatSubject$.subscribe((selectedChatList) => {
      
        if (selectedChatList === 'live-chats') {
          this.getChatList(selectedChatList,true);
        } else if (selectedChatList === 'incoming-chats') {
          this.getChatList(selectedChatList,true);
        } else if (selectedChatList === 'resolved-chats') {
          this.getChatList(selectedChatList,true);
        }
        this.selectedChatCode = selectedChatList;
    });

    this.commonService.notificationSubject$.subscribe((data:any)=>{
      this.toast.info(data.body);
      this.getChatListWithoutLoader(this.selectedChatCode,false);
    });

    this.agentService.transferSuccess$.subscribe(data=>{
      this.getChatList(this.selectedChatCode,false);
    })

  }

  getChatList(chatType: string,withChatSelect:boolean) {
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
            if(withChatSelect){
            this.setSelectedRoom(this.chatlist[0].id);
            this.sendSelectedRoom(
              this.chatlist[0]?.user_id?.split('-')?.join('')
            );
            this.setSelectedClient(this.chatlist[0].user_info);
            }
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
            if(withChatSelect){
            this.setSelectedRoom(this.chatlist[0].id);
            this.sendSelectedRoom(
              this.chatlist[0]?.user_id?.split('-')?.join('')
            );
            this.setSelectedClient(this.chatlist[0].user_info);
            }
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
            if(withChatSelect){
            this.setSelectedRoom(this.chatlist[0]?.room_code);
            this.sendSelectedRoom(this.chatlist[0]?.room_code);
            this.setSelectedClient(this.chatlist[0]?.username);
            }
          }
          this.setPage(chatType);
          this.loader.stop();
        });
    }

    this.setPage(chatType);
    this.loader.stop();
  }

  getChatListWithoutLoader(chatType: string,withChatSelect:boolean) {
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
            if(withChatSelect){
            this.setSelectedRoom(this.chatlist[0].id);
            this.sendSelectedRoom(
              this.chatlist[0]?.user_id?.split('-')?.join('')
            );
            this.setSelectedClient(this.chatlist[0].user_info);
            }
          }
          this.setPage(chatType);
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
            if(withChatSelect){
            this.setSelectedRoom(this.chatlist[0].id);
            this.sendSelectedRoom(
              this.chatlist[0]?.user_id?.split('-')?.join('')
            );
            this.setSelectedClient(this.chatlist[0].user_info);
            }
          }
          this.setPage(chatType);
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
            if(withChatSelect){
            this.setSelectedRoom(this.chatlist[0]?.room_code);
            this.sendSelectedRoom(this.chatlist[0]?.room_code);
            this.setSelectedClient(this.chatlist[0]?.username);
            }
          }
          this.setPage(chatType);
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
    this.socketService.sendWebSocketMessage(data);
  }
}
