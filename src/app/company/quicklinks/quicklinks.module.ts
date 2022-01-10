import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksComponent } from './quicklinks.component';
import { QuicklinksRoutingModule } from './quicklinks-routing.module';



@NgModule({
  declarations: [
    QuicklinksComponent
  ],
  imports: [
    CommonModule,
    QuicklinksRoutingModule
  ]
})
export class QuicklinksModule { }
