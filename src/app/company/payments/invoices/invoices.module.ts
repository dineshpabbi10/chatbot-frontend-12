import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { CommonImport } from 'src/app/common.imports';
import { InvoicesComponent } from './invoices.component';
import { GenericTableModule } from '../../generic-table/generic-table.module';


@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    CommonImport,
    GenericTableModule
  ]
})
export class InvoicesModule { }
