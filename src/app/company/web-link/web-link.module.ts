import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLinkComponent } from './web-link.component';
import { WebLinkRoutingModule } from './web-link-routing.module';
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../generic-table/generic-table.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [
    WebLinkComponent
  ],
  imports: [
    CommonModule,
    WebLinkRoutingModule,
    CommonImport,
    GenericTableModule,
    ConfirmDialogModule
  ],
  providers:[
    ConfirmationService
  ]
})
export class WebLinkModule { }
