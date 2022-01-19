import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  plans = []

  constructor(private formBuilder: FormBuilder, private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router) { }

  ngOnInit(): void {
    this.getPlans()
  }

  getPlans() {
    this.ngxService.start()
    this.CommonService.getAllPricingPlans().subscribe(data => {
      if (data.status) {
        this.plans = data.data

        this.ngxService.stop()
        return
      }
      this.ngxService.stop()
      this.toastr.error(data.message, "ERROR")
    })
  }

  choosePackage(planDetails: any) {
    // console.log(planDetails)
    return
  }

}
