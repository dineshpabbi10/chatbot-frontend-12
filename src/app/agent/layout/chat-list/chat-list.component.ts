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
  private selectedChatList:string  = "";

  constructor(private agentService: AgentServiceService,private loader:NgxUiLoaderService,private toast : ToastrService) { }

  ngOnInit(): void {
    this.agentService.chatSubject$.subscribe((selectedChatList)=>{
      this.selectedChatList = selectedChatList;
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
        }
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
        this.loader.stop();
      });

    }
  }

}
