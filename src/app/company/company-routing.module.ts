import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';

const routes:Routes = [
  {
    path:'',
    component:CompanyComponent,
    children:[
      {path:'dashboard',loadChildren:()=>import("./dashboard/dashboard.module").then((m)=>m.DashboardModule)},
      { path: '',   redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CompanyRoutingModule { }
