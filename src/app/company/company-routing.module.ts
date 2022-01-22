import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule) },
      { path: 'quicklinks', loadChildren: () => import("./quicklinks/quicklinks.module").then((m) => m.QuicklinksModule) },
      { path: 'domain', loadChildren: () => import("./domain/domain.module").then(m => m.DomainModule) },
      { path: 'domain/create', loadChildren: () => import("./add-domain/add-domain.module").then(m => m.AddDomainModule) },
      { path: 'reporting', loadChildren: () => import("./reporting/reporting.module").then(m => m.ReportingModule) },
      { path: 'intents', loadChildren: () => import("./intents/list/list.module").then(m => m.ListModule) },
      { path: 'intents/create', loadChildren: () => import("./intents/create/create.module").then(m => m.CreateModule) },
      { path: 'entities', loadChildren: () => import("./entity/view/view.module").then(m => m.ViewModule) },
      { path: 'entities/create', loadChildren: () => import("./entity/create/create.module").then(m => m.CreateModule) },
      { path: 'faq-upload', loadChildren: () => import("./faq-upload/faq-upload.module").then(m => m.FaqUploadModule) },
      { path: 'web-link', loadChildren: () => import("./web-link/web-link.module").then(m => m.WebLinkModule) },
      { path: 'agents', loadChildren: () => import("./agents/list/list.module").then(m => m.ListModule) },
      { path: 'agents/add', loadChildren: () => import("./agents/add/add.module").then(m => m.AddModule) },
      { path: 'agents', loadChildren: () => import("./agents/list/list.module").then(m => m.ListModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
