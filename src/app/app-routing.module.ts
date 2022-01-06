import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule) },
  { path: 'agent', loadChildren: () => import('./agent/agent.module').then((m) => m.AgentModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule) },
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
