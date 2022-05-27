import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { CommonService } from '../../../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr'
import { CompanyService } from '../../../company/services/company.service'
import { PrimeNGConfig } from 'primeng/api';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef

  constructor(private fb: FormBuilder, private stripeService: StripeService, private commonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, private companyService: CompanyService, private primengConfig: PrimeNGConfig, private router: Router) {

  }

  public payPalConfig: any;


  subscribedPackage: any
  activePlan: string = ''
  rzp1: any
  options = {
    "key": "rzp_test_5uyAHqJ3Z953zX", // Enter the Key ID generated from the Dashboard
    "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Chatbot by Urbanwhizz Enterprises",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": this.savePaymentResponse.bind(this),
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#a733bb"
    }
  };
  displayBasic: boolean;
  
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
  billingMonthly = true
  cost: number = 0.00
  currency: string = "CAD"
  product = {
    price: 777.77,
    description: 'Paypal'
  }



  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('data') || '{}')
    // this.subscribedPackage = userData.subscription_name

    // console.log(this.subscribedPackage)
    this.formInitalization()
    this.getPlans()
    // this.invokeStripe();
    this.primengConfig.ripple = true;



  }


  getCountryDetails(): void {

    if (this.subscribedPackage[0]?.currency == 'INR') {

      this.indiaPayment = true
      this.nonIndianPayment = false
    }
    else {
      this.nonIndianPayment = true
      this.indiaPayment = false

    }
    this.activePlan = this.subscribedPackage[0]?.subscription_name
    this.cost = this.subscribedPackage[0]?.price_monthly
    this.currency = this.subscribedPackage[0]?.currency
    this.createScript(`https://www.paypal.com/sdk/js?currency=${this.currency}&client-id=AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR&disable-funding=credit`)
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

  // initializePayment(amount: number) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51KcmDpSH2WHHeQYxOZNe4Wf3tmteDLlV1tE15akGDwqzFRRW86ZRzQEBc7PTE2papE6In0ZOqTpp5kvQu12y93xp00iFcY2ZsL',
  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       console.log(stripeToken)
  //       alert('Stripe token generated!');
  //     }
  //   });

  //   paymentHandler.open({
  //     name: 'FreakyJolly',
  //     description: 'Buying a Hot Coffee',
  //     amount: amount * 100
  //   });
  // }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement("script");
  //     script.id = "stripe-script";
  //     script.type = "text/javascript";
  //     script.src = "https://checkout.stripe.com/checkout.js";
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'sk_test_51KcmDpSH2WHHeQYxfyPuFqnI6Ui529xrebQ3XmasiWllKHrOYBlxuubMNjONynJ0pLGZgsAcniosQGsTcDyGY23900LSwbzVcO',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken)
  //           alert('Payment has been successfull!');
  //         }
  //       });
  //     }
  //     window.document.body.appendChild(script);
  //   }
  // }

  payWithRazorpay() {
    // console.log(cost)
    console.log(this.cost)
    this.options.amount = (this.cost * 100).toString();
    // console.log(this.options)
    this.rzp1 = new this.companyService.nativeWindow.Razorpay(this.options)
    this.rzp1.open()
  }

  changePlan(planClicked: any) {
    // console.log(planClicked)
    this.subscribedPackage[0] = planClicked
    if (this.billingMonthly) {
      this.cost = planClicked.price_monthly
    }
    else {
      this.cost = planClicked.price_yearly

    }
  }

  onBillingPatternChange(type: any) {

    if (type == "annually") {
      this.billingMonthly = false;
      this.cost = this.subscribedPackage[0].price_yearly
    }
    else {
      this.billingMonthly = true
      this.cost = this.subscribedPackage[0].price_monthly

    }
  }

  recordPayment(response: any) {

  }


  showBasicDialog() {
    // console.log(this.cost)
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: this.currency,
                  value: this.cost
                }
              }
            ]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          this.savePaymentResponse(order)


        },
        onClientAuthorization: (data: any) => {
          // console.log(this.payPalConfig)
          // console.log(
          //   "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          //   data
          // );
          // this.savePaymentResponse(data)
        },
        onCancel: (data: any, actions: any) => {
          console.log("OnCancel", data, actions);
        },
        onError: (err: any) => {
          console.log("OnError", err);
        },

      })
      .render(this.paypalElement.nativeElement);


    this.displayBasic = true
  }


  savePaymentResponse(body: any) {

    const subscribePayLoad = {
      "subscription_name": this.subscribedPackage[0]?.subscription_name
    }
    this.commonService.subscribePlanWithPayment(subscribePayLoad).subscribe(planDataSub => {
      if (planDataSub.status) {
        const payLoad = {
          "trans_payload": body,
          "currency": this.currency,
          "amount": this.cost,
          "upcomming": this.userData.subscription_name == this.subscribedPackage[0]?.subscription_name ? false : true
        }
        // console.log(payLoad)
        this.ngxService.start()
        this.companyService.payment(payLoad).subscribe(data => {
          if (data.status) {

            this.ngxService.stop()
            this.toastr.success(planDataSub.message, 'SUCCESS')
            this.router.navigate(['/company/invoices'])
            return true;
            // return
          }
          else {
            this.ngxService.stop()
            this.toastr.error(data.message, 'ERROR')

            return false

          }
        })

        return
      }
      else {
        this.ngxService.stop()
        this.toastr.error(planDataSub.message, 'ERROR')
        return false
      }
    })



  }

  createScript(url:string){
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }



}
