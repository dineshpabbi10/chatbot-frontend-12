import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../../generic-table/generic-table.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GenericEditModalModule } from '../../generic-edit-modal/generic-edit-modal.module';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    CommonImport,
    GenericTableModule,
    ConfirmDialogModule,
    GenericEditModalModule,
    InputTextModule
  ],
  providers:[
    ConfirmationService
  ]
})
export class ViewModule { }
