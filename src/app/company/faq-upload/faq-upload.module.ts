import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqUploadComponent } from './faq-upload.component';
import { FaqUploadRoutingModule } from './faq-upload-routing.module';
import { CommonImport } from 'src/app/common.imports';



@NgModule({
  declarations: [
    FaqUploadComponent
  ],
  imports: [
    CommonModule,
    FaqUploadRoutingModule,
    CommonImport
  ]
})
export class FaqUploadModule { }
