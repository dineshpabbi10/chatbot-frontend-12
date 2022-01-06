import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
      { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then((m) => m.AboutUsModule) },
      { path: 'features', loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule) },
      { path: 'pricing', loadChildren: () => import('./pricing/pricing.module').then((m) => m.PricingModule) },
      { path: 'contact-us', loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule) },
      { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule) },
      { path: 'terms-and-conditions', loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then((m) => m.TermsAndConditionsModule) },
      { path: 'privacy-policy', loadChildren: () => import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule) }
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
