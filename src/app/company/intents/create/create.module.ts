import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonImport } from '../../../common.imports';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    CommonImport
  ]
})
export class CreateModule { }
