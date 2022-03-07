import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { CommonService } from '../../../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr'



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  countryData: any
  indiaPayment: Boolean = false
  nonIndianPayment: Boolean = false
  plans: any

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: 'black',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: '#87bbfd' }
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee'
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup | any;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private commonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService,) {

  }

  ngOnInit(): void {
    this.formInitalization()
    this.getCountryDetails()
    // this.getPlans()
  }

  createToken(): void {
    const name = 'Vikas Arora';
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  getCountryDetails(): void {
    this.commonService.getCountryUsingIp().subscribe(data => {
      // console.log(data)
      if (data.country_name == 'India') {
        this.indiaPayment = true
        this.nonIndianPayment = false
      }
      else {
        this.nonIndianPayment = true
        this.indiaPayment = false

      }

    })
  }

  getPlans() {
    this.ngxService.start()
    this.commonService.getAllPricingPlans().subscribe(data => {
      if (data.status) {
        this.plans = data.data

        this.ngxService.stop()
        return
      }
      this.ngxService.stop()
      this.toastr.error(data.message, "ERROR")
    })
  }

  formInitalization() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      recurring: [false, []]
    });
  }

}
