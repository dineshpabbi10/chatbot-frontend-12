import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service'
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  isEmailVerified = false
  message = ""
  


  constructor(private route: ActivatedRoute, private commonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router) { }

  ngOnInit(): void {
    

    this.ngxService.start()
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (!params.user_id) {
          this.toastr.error('Invalid Request!', 'ERROR')
          this.router.navigate(['/login'])

        }
        if (!params.confirmation_token) {
          this.toastr.error('Invalid Request!', 'ERROR')
          this.router.navigate(['/login'])
        }
        this.commonService.requestForEmailVerification(params.user_id, params.confirmation_token).subscribe(data => {
          if (data.status) {
            this.isEmailVerified = true
            this.message = data.message
            this.toastr.success(data.message, 'SUCCESS')
          } else {
            this.message = data.message

            this.toastr.error(data.message, 'ERROR')
          }
          this.ngxService.stop()
        })
        // this.orderby = params.orderby;
        // console.log(this.orderby); // price
      }
      );
  }

  resendEmailVeriLink() {
    this.router.navigate(['/email/verify/resend'])
  }

}
