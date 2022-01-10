import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinksComponent } from './quicklinks.component';

const routes:Routes = [
  {
    path:'',
    component: QuicklinksComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class QuicklinksRoutingModule { }
