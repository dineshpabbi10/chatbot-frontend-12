import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResendLinkRoutingModule } from './resend-link-routing.module';
import { ResendLinkComponent } from './resend-link.component';
import { CommonImport } from '../../../common.imports'


@NgModule({
  declarations: [
    ResendLinkComponent
  ],
  imports: [
    CommonModule,
    ResendLinkRoutingModule,
    CommonImport
  ]
})
export class ResendLinkModule { }
