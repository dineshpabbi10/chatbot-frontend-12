import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAgentComponent } from './add-agent.component';
import { AddAgentRoutingModule } from './add-agent-routing.module';



@NgModule({
  declarations: [
    AddAgentComponent
  ],
  imports: [
    CommonModule,
    AddAgentRoutingModule
  ]
})
export class AddAgentModule { }
