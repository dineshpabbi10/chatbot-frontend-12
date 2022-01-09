import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variable declaration
  loginForm: FormGroup | any

  constructor(private formBuilder: FormBuilder, private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this.checkIfUserAlreadyLoggedIn()
  }

  login() {
    this.ngxService.start()

    if (this.loginForm.status == "INVALID") {
      this.toastr.warning('All fields are mandatory', 'Warning')
      this.ngxService.stop()
      return
    }

    this.CommonService.login(this.loginForm.value).subscribe(data => {
      if (data.status) {
        this.toastr.success(data.message, 'SUCCESS')
        if (data.data.role == "company") {
          localStorage.setItem("company_token", JSON.stringify(data.data))
          this.router.navigate(['/company'])
        }
        else if (data.data.role == "agent") {
          localStorage.setItem("agent_token", JSON.stringify(data.data))
          this.router.navigate(['/agent'])
        }
      }
      else {
        this.toastr.error(data.message, 'ERROR')
      }
      this.ngxService.stop()
    })
  }


  checkIfUserAlreadyLoggedIn() {

    if (localStorage.getItem('company_token') != null) {
      this.router.navigate(['/company'])
    }
    else if (localStorage.getItem('agent_token') != null) {
      this.router.navigate(['/agent'])
    }
    else {

      this.router.navigate(['/login'])
    }
  }
}
