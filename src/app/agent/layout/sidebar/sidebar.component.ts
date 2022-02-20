import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AgentServiceService } from '../../services/agent-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public items: MenuItem[] = [];
  public activeSection : string = "";

  constructor(private agentService: AgentServiceService) { }

  ngOnInit(): void {

    // listen for page changes
    this.agentService.chatSubject$.subscribe((page)=>{
      this.activeSection = page;
    })

    this.items = [{
      label: 'Inbox',
      items: [
          {label: 'Live Chat', icon: 'pi pi-fw pi-plus'},
          {label: 'Incoming Requests', icon: 'pi pi-fw pi-download'}
        ]
      },
      {
          label: 'History',
          items: [
              {label: 'Resolved Chats', icon: 'pi pi-fw pi-user-plus'},
              {label: 'Unresolved Chats', icon: 'pi pi-fw pi-user-minus'}
          ]
      }];


  }

  sendSelectedPage(page:string):void{
    this.agentService.sendChatPageInfo(page);
  }

}
