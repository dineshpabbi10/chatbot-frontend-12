import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyplansRoutingModule } from './myplans-routing.module';
import { MyplansComponent } from './myplans.component'
import { CommonImport } from 'src/app/common.imports';
import { GenericTableModule } from '../../generic-table/generic-table.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    MyplansComponent
  ],
  imports: [
    CommonModule,
    MyplansRoutingModule,
    CommonImport,
    GenericTableModule,
    DialogModule,
    ButtonModule
  ]
})
export class MyplansModule { }
