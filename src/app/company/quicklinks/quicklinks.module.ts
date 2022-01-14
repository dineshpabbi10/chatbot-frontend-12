import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksComponent } from './quicklinks.component';
import { QuicklinksRoutingModule } from './quicklinks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuicklinksComponent
  ],
  imports: [
    CommonModule,
    QuicklinksRoutingModule,
    ReactiveFormsModule
  ]
})
export class QuicklinksModule { }
