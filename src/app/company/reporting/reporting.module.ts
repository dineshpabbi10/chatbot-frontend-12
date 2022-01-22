import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingComponent } from './reporting.component';
import { ReportingRoutingModule } from './reporting-routing.module';
import { CommonImport } from 'src/app/common.imports';



@NgModule({
  declarations: [
    ReportingComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    CommonImport
  ]
})
export class ReportingModule { }
