import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLinkComponent } from './web-link.component';
import { WebLinkRoutingModule } from './web-link-routing.module';
import { CommonImport } from 'src/app/common.imports';



@NgModule({
  declarations: [
    WebLinkComponent
  ],
  imports: [
    CommonModule,
    WebLinkRoutingModule,
    CommonImport
  ]
})
export class WebLinkModule { }
