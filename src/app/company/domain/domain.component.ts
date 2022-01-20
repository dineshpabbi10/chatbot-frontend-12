import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  public domainsList :any[] = [];
  public domainsLoading : boolean = false;

  constructor(private CompanyService: CompanyService,private loader: NgxUiLoaderService, private toast : ToastrService) { }

  ngOnInit(): void {
    this.getDomainList()
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
