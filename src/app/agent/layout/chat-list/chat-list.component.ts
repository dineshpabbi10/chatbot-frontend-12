import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AgentServiceService } from '../../services/agent-service.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public chatlist : any[] = [];
  public selectedChatList:string  = "";
  public selectedChat : number | string  = 0;

  constructor(private agentService: AgentServiceService,private loader:NgxUiLoaderService,private toast : ToastrService) { }

  ngOnInit(): void {
    this.agentService.chatSubject$.subscribe((selectedChatList)=>{
      this.getChatList(selectedChatList);
    })
  }

  getChatList(chatType:string){
    this.loader.start();
    if(chatType === "live-chats"){
      
      this.agentService.getAllChats()
      .pipe(catchError((err)=>{
          this.toast.error(err.message);
          return of(err);
        }))
      .subscribe((response)=>{
        if(response.status){
          this.chatlist = response.data;
          this.setSelectedChat(this.chatlist[0].id);
          this.setSelectedRoom(this.chatlist[0].user_id);
        }
        this.setPage(chatType);
        this.loader.stop();
      });

    }else if(chatType === "incoming-chats"){

      this.agentService.getAllAssignedChats()
      .pipe(catchError((err)=>{
          this.toast.error(err.message);
          return of(err);
        }))
      .subscribe((response)=>{
        if(response.status){
          this.chatlist = response.data;
        }
        this.setPage(chatType);
        this.loader.stop();
      });

    }else if(chatType === "resolved-chats"){

      this.agentService.getOldConversations()
      .pipe(catchError((err)=>{
          this.toast.error(err.message);
          return of(err);
        }))
      .subscribe((response)=>{
        if(response.status){
          this.chatlist = response.data;
        }
        this.setPage(chatType);
        this.loader.stop();
      });

    }else if(chatType === "unresolved-chats"){

      this.agentService.getOldConversations()
      .pipe(catchError((err)=>{
          this.toast.error(err.message);
          return of(err);
        }))
      .subscribe((response)=>{
        if(response.status){
          this.chatlist = response.data;
        }
        this.setPage(chatType);
        this.loader.stop();
      });

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

  setSelectedChat(id:number | string){
      this.selectedChat = id;
  }

  setSelectedRoom(id:any){
      this.agentService.selectedChat.next(id.split("-").join(""));
  }

}
