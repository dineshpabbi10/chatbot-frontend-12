import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resend-link',
  templateUrl: './resend-link.component.html',
  styleUrls: ['./resend-link.component.css']
})
export class ResendLinkComponent implements OnInit {

  resendVerificationLinkForm: FormGroup | any


  constructor(private formBuilder: FormBuilder, private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router) { }

  ngOnInit(): void {
    this.resendVerificationLinkForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submit() {
    if (this.resendVerificationLinkForm.status == "INVALID") {
      this.toastr.warning('Email is required', 'WARNING')
      return
    }
    this.ngxService.start()
    this.CommonService.resendEmailVerificationLink(this.resendVerificationLinkForm.value).subscribe(data => {
      console.log(data)
      if (data.status) {
        this.toastr.success(data.message, 'SUCCESS')
        this.router.navigate(['/login'])
      }
      else {
        this.toastr.error(data.message, 'ERROR')
      }
      this.ngxService.stop()
    })
  }

}
