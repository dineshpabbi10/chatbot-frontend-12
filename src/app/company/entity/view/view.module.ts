import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../../generic-table/generic-table.module';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    CommonImport,
    GenericTableModule
  ]
})
export class ViewModule { }
