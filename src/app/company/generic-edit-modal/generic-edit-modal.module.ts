import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericEditModalComponent } from './generic-edit-modal.component';
import {DialogModule} from 'primeng/dialog';
import { CommonImport } from 'src/app/common.imports';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    GenericEditModalComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    CommonImport,
    ButtonModule
  ],
  exports:[
    GenericEditModalComponent
  ]
})
export class GenericEditModalModule { }
