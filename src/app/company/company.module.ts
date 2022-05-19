import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CommonImport } from '../common.imports';
import { GenericTableModule } from './generic-table/generic-table.module';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    CompanyComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CommonImport,
    GenericTableModule,
    OverlayPanelModule,
    ChipModule,
    CardModule,
    ButtonModule,
    BadgeModule
  ]
})
export class CompanyModule { }
