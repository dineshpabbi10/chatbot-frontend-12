import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  public domainsList :any[] = [];
  public domainsLoading : boolean = true;

  constructor(private CompanyService: CompanyService,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getDomainList()
  }

  getDomainList() {
    this.domainsLoading = true;
    this.CompanyService.getDomainList()
    .pipe(
      
    )
    .subscribe(data => {
      this.domainsList = data.data;
      this.domainsLoading = false;
    })
  }

}
