import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { CommonImport } from '../../common.imports'
import { AddDomainModule } from '../add-domain/add-domain.module';
import { CreateModule } from '../entity/create/create.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericTableModule } from '../generic-table/generic-table.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { GenericEditModalModule } from '../generic-edit-modal/generic-edit-modal.module';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    DomainComponent
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    CommonImport,
    GenericTableModule,
    ConfirmDialogModule,
    GenericEditModalModule,
    InputTextModule
  ],
  providers:[
    ConfirmationService
  ]
})
export class DomainModule { }
