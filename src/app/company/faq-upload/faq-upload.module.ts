import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqUploadComponent } from './faq-upload.component';
import { FaqUploadRoutingModule } from './faq-upload-routing.module';



@NgModule({
  declarations: [
    FaqUploadComponent
  ],
  imports: [
    CommonModule,
    FaqUploadRoutingModule
  ]
})
export class FaqUploadModule { }
