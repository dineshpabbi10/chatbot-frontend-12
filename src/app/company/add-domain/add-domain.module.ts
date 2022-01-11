import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDomainRoutingModule } from './add-domain-routing.module';
import { AddDomainComponent } from './add-domain.component';


@NgModule({
  declarations: [
    AddDomainComponent
  ],
  imports: [
    CommonModule,
    AddDomainRoutingModule
  ]
})
export class AddDomainModule { }
