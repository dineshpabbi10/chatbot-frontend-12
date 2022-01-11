import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { CommonImport } from '../../common.imports'


@NgModule({
  declarations: [
    DomainComponent
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    CommonImport
  ]
})
export class DomainModule { }
