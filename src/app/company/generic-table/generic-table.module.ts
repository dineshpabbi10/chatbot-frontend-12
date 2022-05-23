import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonImport } from 'src/app/common.imports';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  exports: [
    GenericTableComponent,
    CommonImport
  ]
})
export class GenericTableModule { }
