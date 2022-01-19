import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { CommonImport } from '../../common.imports'
import { AddDomainModule } from '../add-domain/add-domain.module';
import { CreateModule } from '../entity/create/create.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DomainComponent
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    CommonImport,
  ]
})
export class DomainModule { }
