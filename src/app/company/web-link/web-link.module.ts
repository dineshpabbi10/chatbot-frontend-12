import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLinkComponent } from './web-link.component';
import { WebLinkRoutingModule } from './web-link-routing.module';



@NgModule({
  declarations: [
    WebLinkComponent
  ],
  imports: [
    CommonModule,
    WebLinkRoutingModule
  ]
})
export class WebLinkModule { }
