import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

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

}
