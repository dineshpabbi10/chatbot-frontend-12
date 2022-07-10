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
    this.ngxService.start()
    var userLoggedIn: any
    userLoggedIn = localStorage.getItem('data')
    userLoggedIn = JSON.parse(userLoggedIn)

    // console.log(userLoggedIn?.subscribed)
    // this.ngxService.stop()
    // return

    if (!userLoggedIn) {
      this.toastr.warning('are you registered with us?', 'WARNING')
      this.router.navigate(['/register'])
      this.ngxService.stop()
      return
    }
    // userLoggedIn.s
    // this.ngxService.stop()
    // userLoggedIn.

    const body = new HttpParams({
      fromObject: {
        "subscription_name": planDetails.subscription_name
      }
    });
    // this.ngxService.stop()
    this.CommonService.subscribeaPlan(body).subscribe(data => {
      if (data.status) {
        // console.log(data)
        userLoggedIn.subscribed = data.data.valid
        userLoggedIn.subscription_name = planDetails.subscription_name
        userLoggedIn.valid = data.data.valid
        if (data.data.is_trial) {
          userLoggedIn.trial = data.data.is_trial
        }

        localStorage.setItem('data', JSON.stringify(userLoggedIn))
        this.toastr.success(data.message, 'SUCCESS')
        // return
        this.router.navigate(['/company'])
      }
      else {
        this.toastr.error(data.message, 'ERROR')
      }
      this.ngxService.stop()
    })
    return
  }

}
