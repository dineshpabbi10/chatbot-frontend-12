import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public intentList: any[] = [];
  public cols = [
    { field: 'domain', header: 'Domain' },
    { field: 'intent', header: 'Intent' },
    { field: 'response', header: 'Response' },
    { field: 'user_say', header: 'User Response' },
  ];

  constructor(
    private companyService: CompanyService,
    private toast: ToastrService,
    private loader: NgxUiLoaderService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    // Delete button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'intents' && data.action === 'delete') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            //Actual logic to perform a confirmation
            this.companyService.deleteIntent(data.payload[0]).
            pipe(catchError(err=>{
              this.toast.error(err.message);
              return of(err.message)
            }))
            .subscribe((res)=>{
              if(res.status){
                this.toast.success("Record successfully deleted");
              } 
              this.getIntentList();
            });
          },
        });
      }
    });

    // Edit button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'intents' && data.action === 'edit') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform insert action?',
          accept: () => {
            //Actual logic to perform a confirmation
            console.log(data);
          },
        });
      }
    });

    this.getIntentList();
    
    
  }

  getIntentList(){
    this.loader.start('getIntentList');
    this.companyService
      .getIntentList()
      .pipe(catchError((err) => of('error')))
      .subscribe((res) => {
        if (res === 'error') {
          this.toast.error('Error Fetching Intents list');
        } else {
          this.intentList = res.data;
        }
        this.loader.stop('getIntentList');
      });
  }
}
