import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css'],
})
export class ReportingComponent implements OnInit {
  public reportData: any[] = [];
  public cols = [
    { field: 'date', header: 'Date' },
    { field: 'feedback', header: 'Feedback' },
    { field: 'user_id', header: 'User Id' },
    { field: 'username', header: 'User Name' },
    { field: 'email', header: 'User Email' },
    { field: 'country', header: 'Country' },
    { field: 'state', header: 'State' },
    { field: 'mobile', header: 'Phone No.' },
  ];

  public fromDate: FormControl = new FormControl(null, [Validators.required]);

  public toDate: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private companyService: CompanyService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private confirmationService : ConfirmationService
  ) {}

  ngOnInit(): void {
    // Delete button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'reporting' && data.action === 'delete') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            //Actual logic to perform a confirmation
            console.log(data);
          },
        });
      }
    });
  }

  submitForm() {
    this.loader.start();
    this.companyService
      .getReport({
        startdate: this.fromDate.value,
        enddate: this.toDate.value,
      })
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        if (res.status) {
          this.reportData = res.data;
        }
        this.loader.stop();
      });
  }
}
