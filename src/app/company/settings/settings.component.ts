import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingForm: FormGroup | any

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private toastr: ToastrService, private loader: NgxUiLoaderService, private router: Router) { }

  ngOnInit(): void {
    this.settingForm = this.formBuilder.group({
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: [MustMatch('password', 'confirm_password')]
    })
  }

  changePassword() {

    // console.log(this.settingForm)
    this.loader.start()

    this.companyService.changePassword({
      "new_password": this.settingForm.get("password")?.value,
      "current_password": this.settingForm.get("current_password")?.value,
    }).pipe(catchError(err => {
      this.loader.stop()

      return of(err.message)
    }
    )).subscribe(data => {
      if (data.status) {
        localStorage.clear()
        this.loader.stop()
        this.toastr.success(data.message, 'SUCCESS')
        this.router.navigate(['/login'])
        return
      }
      else {
        this.loader.stop()
        this.toastr.error(data.message, 'error')
      }
    })


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
