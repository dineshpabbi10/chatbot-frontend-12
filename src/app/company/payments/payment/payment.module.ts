import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { CommonImport } from 'src/app/common.imports';
import { PaymentComponent } from './payment.component';
import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    CommonImport,
    NgxStripeModule.forRoot('pk_test_xQpTjJhKEWFzEvoqVVxgNO95'),
  ]
})
export class PaymentModule { }
