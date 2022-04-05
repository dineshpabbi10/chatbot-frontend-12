import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotSettingsComponent } from './bot-settings.component';

const routes: Routes = [
  {
    path: '',
    component: BotSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotSettingsRoutingModule { }
