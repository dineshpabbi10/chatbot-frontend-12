import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    "first_name": new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'), this.companyService.noWhitespaceValidator]),
    "last_name": new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'), this.companyService.noWhitespaceValidator]),
    "username": new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]*'), this.companyService.noWhitespaceValidator]),
    "email": new FormControl('', [Validators.required,Validators.email, this.companyService.noWhitespaceValidator]),
    "password1": new FormControl('', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), this.companyService.noWhitespaceValidator]),
    "password2": new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), this.companyService.noWhitespaceValidator]),
    "mobile_no": new FormControl('', [Validators.required])
  }, {
    validators: [this.companyService.passwordMatchValidator()]
  })

  constructor(
    private companyService: CompanyService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      // console.log(value);
    })
  }

  submitForm() {
    this.loader.start();
    this.companyService.createAgent({
      "first_name": this.form.get('first_name')?.value,
      "last_name": this.form.get('last_name')?.value,
      "username": this.form.get('username')?.value,
      "email": this.form.get('email')?.value,
      "password": this.form.get('password1')?.value,
      "mobile_no": this.form.get('mobile_no')?.value
    }).pipe(
      catchError(err => {
        return of(err.message);
      })
    ).subscribe(res => {
      if (res.status) {
        this.form.reset();
        this.toast.success(res.message);
      } else {
        this.toast.error(res.message);
      }
      this.loader.stop();
    });
  }


}
