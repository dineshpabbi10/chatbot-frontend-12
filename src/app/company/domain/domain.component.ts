import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service'
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  public domainsList :any[] = [];
  public domainsLoading : boolean = false;
  public cols = [
    { field: 'domain', header: 'Domain' },
    { field: 'client', header: 'Client' },
];

  constructor(private CompanyService: CompanyService,private loader: NgxUiLoaderService, private toast : ToastrService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getDomainList();

    // Delete button clicked in generic table
    this.CompanyService.selectedRecord$.subscribe(data=>{
      if(data.component === "domain" && data.action === "delete"){
          this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                //Actual logic to perform a confirmation
                console.log(data);
              }
          });
      }
    })
  }

  getDomainList() {
    this.loader.start("getDomainsList");
    this.CompanyService.getDomainList()
    .pipe(
      catchError(err=>{
        this.toast.error(err.message);
        return of(err.message);
      })
    )
    .subscribe(data => {
      this.domainsList = data.data;
      this.domainsLoading = false;
      this.loader.stop("getDomainsList");
    })
  }

}
