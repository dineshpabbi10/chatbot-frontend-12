import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { CommonImport } from 'src/app/common.imports';


@NgModule({
  declarations: [
    TrainingComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    CommonImport
  ]
})
export class TrainingModule { }
