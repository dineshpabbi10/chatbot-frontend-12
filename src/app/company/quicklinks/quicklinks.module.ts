import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksComponent } from './quicklinks.component';
import { QuicklinksRoutingModule } from './quicklinks-routing.module';
import { CommonImport } from 'src/app/common.imports';



@NgModule({
  declarations: [
    QuicklinksComponent
  ],
  imports: [
    CommonModule,
    QuicklinksRoutingModule,
    CommonImport
  ]
})
export class QuicklinksModule { }
