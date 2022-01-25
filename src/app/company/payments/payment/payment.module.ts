import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { CommonImport } from 'src/app/common.imports';
import { PaymentComponent } from './payment.component';


@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    CommonImport
  ]
})
export class PaymentModule { }
