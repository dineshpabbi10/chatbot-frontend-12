import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.css']
})
export class AddDomainComponent implements OnInit {
  public domainName : FormControl = new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator])

  constructor(private companyService : CompanyService,private toastNotification : ToastrService) { }

  ngOnInit(): void {
  }

  createDomain(){
    this.companyService.createDomain({
      "domain":this.domainName.value
    })
    .pipe(
      catchError(err => {
        this.toastNotification.error("Cannot add Domain. Error Completing request.");
        return of("error");
      })
    )
    .subscribe(res=>{
      if(res !== "error"){
        this.toastNotification.success("Domain Created Successfully !");  
        this.domainName.setValue('');
      }  
    })
  }

}
