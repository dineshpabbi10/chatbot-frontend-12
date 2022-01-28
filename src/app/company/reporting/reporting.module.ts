import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingComponent } from './reporting.component';
import { ReportingRoutingModule } from './reporting-routing.module';
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../generic-table/generic-table.module';



@NgModule({
  declarations: [
    ReportingComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    CommonImport,
    GenericTableModule
  ]
})
export class ReportingModule { }
