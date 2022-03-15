import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { CommonService } from '../../../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr'
import { CompanyService } from '../../../company/services/company.service'


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  subscribedPackage: any
  activePlan: string = ''
  rzp1: any
  options = {
    "key": "rzp_test_5uyAHqJ3Z953zX", // Enter the Key ID generated from the Dashboard
    "amount": "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "handler": function (response: any) {
      console.log(response)
    },
    "prefill": {
      "name": "Gaurav Kumar",
      "email": "gaurav.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  countryData: any
  indiaPayment: Boolean = false
  nonIndianPayment: Boolean = false
  plans: any
  paymentHandler: any = null;
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
  userData: any

  stripeTest: FormGroup | any;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private commonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, private companyService: CompanyService) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('data') || '{}')
    // this.subscribedPackage = userData.subscription_name

    // console.log(this.subscribedPackage)
    this.formInitalization()
    this.getPlans()
    this.invokeStripe();
  }

  // createToken(): void {
  //   const name = 'Vikas Arora';
  //   this.stripeService
  //     .createToken(this.card.element, { name })
  //     .subscribe((result) => {
  //       if (result.token) {
  //         // Use the token
  //         console.log(result.token.id);
  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }

  getCountryDetails(): void {

    if (this.subscribedPackage[0]?.currency == 'inr') {

      this.indiaPayment = true
      this.nonIndianPayment = false
    }
    else {
      this.nonIndianPayment = true
      this.indiaPayment = false

    }
    this.activePlan = this.subscribedPackage[0]?.subscription_name
    // this.commonService.getCountryUsingIp().subscribe(data => {
    //   // console.log(data)
    //   if (data.country_name == 'India') {
    //   }
    //   else {

    //   }

    // })
  }

  getPlans() {
    this.ngxService.start()
    this.commonService.getAllPricingPlans().subscribe(data => {
      // console.log(data)
      if (data.status) {

        this.plans = data.data
        this.subscribedPackage = this.plans.filter((s: any) => s.subscription_name == this.userData.subscription_name)
        console.log(this.subscribedPackage)
        this.getCountryDetails()

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

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KcmDpSH2WHHeQYxOZNe4Wf3tmteDLlV1tE15akGDwqzFRRW86ZRzQEBc7PTE2papE6In0ZOqTpp5kvQu12y93xp00iFcY2ZsL',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });

    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'sk_test_51KcmDpSH2WHHeQYxfyPuFqnI6Ui529xrebQ3XmasiWllKHrOYBlxuubMNjONynJ0pLGZgsAcniosQGsTcDyGY23900LSwbzVcO',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

  payWithRazorpay() {
    this.rzp1 = new this.companyService.nativeWindow.Razorpay(this.options)
    this.rzp1.open()
  }

  changePlan() {

  }

}
