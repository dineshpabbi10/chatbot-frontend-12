import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-web-link',
  templateUrl: './web-link.component.html',
  styleUrls: ['./web-link.component.css']
})
export class WebLinkComponent implements OnInit {
  public domainsList:any[] = [];
  public uploadForm:FormGroup;

  constructor(
    private companyService: CompanyService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private formBuilder: FormBuilder
  ) {
    
    this.uploadForm = this.formBuilder.group({
      website: new FormControl(null,[Validators.required]),
      selectedDomain : new FormControl(null, [
        Validators.required,
      ])
    });

   }

  ngOnInit(): void {
    this.getDomainList();
  }

  
  getDomainList() {
    this.loader.start('getDomainsList');
    this.companyService
      .getDomainList()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((data) => {
        if (data.status) {
          this.domainsList = data.data;
        }
        this.loader.stop('getDomainsList');
      });
  }

}
