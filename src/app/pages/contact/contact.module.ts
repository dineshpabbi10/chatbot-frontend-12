import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { CommonImport } from 'src/app/common.imports';
import { RecaptchaModule } from "ng-recaptcha";


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    CommonImport,
    RecaptchaModule
  ]
})
export class ContactModule { }
