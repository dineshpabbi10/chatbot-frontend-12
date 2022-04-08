import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyplansRoutingModule } from './myplans-routing.module';
import { MyplansComponent } from './myplans.component'
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../../generic-table/generic-table.module';

@NgModule({
  declarations: [
    MyplansComponent
  ],
  imports: [
    CommonModule,
    MyplansRoutingModule,
    CommonImport,
    GenericTableModule
  ]
})
export class MyplansModule { }
