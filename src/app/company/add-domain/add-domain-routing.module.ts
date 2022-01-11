import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDomainComponent } from './add-domain.component';

const routes: Routes = [
  {
    path: '',
    component: AddDomainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDomainRoutingModule { }
