import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CommonImport } from 'src/app/common.imports';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CommonImport,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
