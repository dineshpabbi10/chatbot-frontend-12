import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDomainRoutingModule } from './add-domain-routing.module';
import { AddDomainComponent } from './add-domain.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonImport} from '../../common.imports';

@NgModule({
  declarations: [
    AddDomainComponent
  ],
  imports: [
    CommonModule,
    AddDomainRoutingModule,
    ReactiveFormsModule,
    CommonImport
  ]
})
export class AddDomainModule { }
