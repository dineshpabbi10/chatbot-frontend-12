import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResendLinkComponent } from './resend-link.component';

const routes: Routes = [{
  path: '',
  component: ResendLinkComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResendLinkRoutingModule { }
