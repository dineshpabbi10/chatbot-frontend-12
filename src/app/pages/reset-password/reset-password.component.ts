import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: any
  resetPasswordForm: any = FormGroup

  constructor(private formBuilder: FormBuilder, private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.token = this.activatedRoute.snapshot.queryParams.token

    this.resetPasswordForm = this.formBuilder.group({
      password: new FormControl(null, [Validators.required]),
      confirm_password: new FormControl(null, [Validators.required])
    }, {
      validator: MustMatch('password', 'confirm_password')
    })

  }

  submitForm() {
    if (this.resetPasswordForm.status == "INVALID") {
      this.toastr.error("Invalid value", "ERROR")
      return
    }
    this.ngxService.start()

    this.CommonService.resetPassword(this.resetPasswordForm.value, this.token).subscribe(data => {
      if (data.status) {
        this.toastr.success(data.message, "SUCCESS")
        this.ngxService.stop()
        // this.router.navigate(['/login'])
      }
      this.toastr.error(data.message, "ERROR")
      this.ngxService.stop()
    })



    // this.router.navigate(['/login'])
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
