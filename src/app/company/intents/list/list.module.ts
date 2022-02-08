import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../../generic-table/generic-table.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GenericEditModalModule } from '../../generic-edit-modal/generic-edit-modal.module';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
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
export class ListModule { }
