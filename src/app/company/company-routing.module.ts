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
      {path:'quicklinks',loadChildren:()=>import("./quicklinks/quicklinks.module").then((m)=>m.QuicklinksModule)},
      {path:'domain',loadChildren:()=>import("./domain/domain.module").then(m=>m.DomainModule)},
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
