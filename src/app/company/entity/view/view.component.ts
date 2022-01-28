import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  public entityList: any[] = [];
  public cols = [
    { field: 'entity_name', header: 'Entity Name' },
    { field: 'entity_word', header: 'Entity Words' },
    { field: 'intent', header: 'Intent' },
    { field: 'message', header: 'User Message' },
    { field: 'response', header: 'Bot Response' },
  ];
  constructor(
    private companyService: CompanyService,
    private toast: ToastrService,
    private loader: NgxUiLoaderService,
    private confirmationService:ConfirmationService
  ) {}

  ngOnInit(): void {
    // Delete button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'entity' && data.action === 'delete') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            //Actual logic to perform a confirmation
            console.log(data);
          },
        });
      }
    });

    this.loader.start('getEntitiesList');
    this.companyService
      .getEntitiesList()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        if (res.status) {
          this.entityList = res.data;
        }
        this.loader.stop('getEntitiesList');
      });
  }
}
