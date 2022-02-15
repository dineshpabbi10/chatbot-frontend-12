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



@NgModule({
  declarations: [
    AgentComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    AvatarModule,
    MenuModule,
    DividerModule,
    BadgeModule
  ]
})
export class AgentModule { }
