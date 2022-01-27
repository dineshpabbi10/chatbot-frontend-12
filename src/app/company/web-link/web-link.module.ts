import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLinkComponent } from './web-link.component';
import { WebLinkRoutingModule } from './web-link-routing.module';
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../generic-table/generic-table.module';



@NgModule({
  declarations: [
    WebLinkComponent
  ],
  imports: [
    CommonModule,
    WebLinkRoutingModule,
    CommonImport,
    GenericTableModule
  ]
})
export class WebLinkModule { }
