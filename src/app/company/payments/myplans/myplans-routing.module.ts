import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyplansComponent } from './myplans.component';

const routes: Routes = [
  {
    path: '',
    component: MyplansComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyplansRoutingModule { }
