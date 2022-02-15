import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { AgentRoutingModule } from './agent-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import {AvatarModule} from 'primeng/avatar';
import {MenuModule} from 'primeng/menu';
import {DividerModule} from 'primeng/divider';
import {BadgeModule} from 'primeng/badge';
import { ChatListComponent } from './layout/chat-list/chat-list.component';
import {InputTextModule} from 'primeng/inputtext';
import { ChatBoxComponent } from './layout/chat-box/chat-box.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AgentComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ChatListComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    AvatarModule,
    MenuModule,
    DividerModule,
    BadgeModule,
    InputTextModule,
    ButtonModule
  ]
})
export class AgentModule { }
