import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotSettingsRoutingModule } from './bot-settings-routing.module';
import { CommonImport } from '../../common.imports';
import { BotSettingsComponent } from './bot-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'primeng/colorpicker'
import { FileUploadModule } from "primeng/fileupload";

@NgModule({
  declarations: [
    BotSettingsComponent
  ],
  imports: [
    CommonModule,
    BotSettingsRoutingModule,
    CommonImport,
    ReactiveFormsModule,
    RouterModule,
    ColorPickerModule,
    FileUploadModule
  ]
})
export class BotSettingsModule { }
