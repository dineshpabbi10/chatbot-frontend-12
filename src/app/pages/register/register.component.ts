import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Variable Declaration
  registrationForm: any = FormGroup
  countriesList: any
  // submitted = false
  dropdownSettings = {
    singleSelection: true,
    idField: 'code',
    textField: 'name',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };

  constructor(private formBuilder: FormBuilder, private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router) { }

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      first_name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      last_name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      mobile_no: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirm_password: new FormControl(null, [Validators.required]),
      country_code: new FormControl(null, [Validators.required]),
      agree_on_terms: new FormControl(null, [Validators.required])
    }, {
      validator: MustMatch('password', 'confirm_password')
    });

    this.getCountries()
  }

  registerUser() {
    this.ngxService.start()
    // this.submitted = true
    if (this.registrationForm.status == "INVALID") {
      this.toastr.warning('All fields are mandatory', 'Warning')
      this.ngxService.stop()
      return
    }
    this.CommonService.signup(this.registrationForm.value).subscribe(data => {
      if (data.status) {
        this.toastr.success(data.message, 'SUCCESS')
        this.router.navigate(['/login'])

      }
      else {
        this.toastr.error(data.message, 'ERROR')
      }
      this.ngxService.stop()
    })
    // console.log(this.registrationForm)
  }

  getCountries() {
    this.ngxService.start()
    this.CommonService.countriesList().subscribe(data => {

      // this.toastr.success(data.message, 'SUCCESS')
      this.countriesList = data.data

      this.ngxService.stop()
    })
  }


  onItemSelect(evt: any) {

  }

}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}