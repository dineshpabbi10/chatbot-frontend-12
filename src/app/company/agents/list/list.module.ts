import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
// import { GenericTableModule } from '../../generic-table/generic-table.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    // GenericTableModule,
    ConfirmDialogModule,
    TableModule
  ],
  providers:[
    ConfirmationService
  ]
})
export class ListModule { }
