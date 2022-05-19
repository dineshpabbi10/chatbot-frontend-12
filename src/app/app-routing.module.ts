import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyGuard } from './auth-guard/company.guard';
import { AgentGuard } from './auth-guard/agent.guard'

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  { path: 'agent', loadChildren: () => import('./agent/agent.module').then((m) => m.AgentModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule) },
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
