import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  public reportData : any[] = [];

  public fromDate:FormControl = new FormControl(null,[
    Validators.required,
  ])

  public toDate:FormControl = new FormControl(null,[
    Validators.required,
  ])

  constructor(private companyService:CompanyService,private loader:NgxUiLoaderService,private toast: ToastrService) { }

  ngOnInit(): void {
  }

  submitForm(){
    this.loader.start();
    this.companyService.getReport({
      "startdate":this.fromDate.value,
      "enddate":this.toDate.value
    }).pipe(
      catchError(err=>{
        this.toast.error(err.message);
        return of(err.message);
      })
    ).subscribe(res=>{
      if(res.status){
        this.reportData = res.data;
      }
      this.loader.stop();
    })

  }

}
