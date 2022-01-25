import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup | any

  constructor(private formBuilder: FormBuilder, private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submitForm() {
    this.ngxService.start()
    if (this.forgetPasswordForm.status == "INVALID") {
      this.toastr.error('Invalid form!', 'ERROR')
      return;
    }
    this.CommonService.forgetPassword(this.forgetPasswordForm.value).subscribe(data => {
      if (data.status) {
        this.toastr.success(data.message, 'SUCCESS')
        this.ngxService.stop()
        this.ngOnInit()
        return
      }
      this.toastr.error(data.message, 'ERROR')
      this.ngxService.stop()
    })
  }

}
