import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../../generic-table/generic-table.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    CommonImport,
    GenericTableModule
  ]
})
export class ListModule { }
