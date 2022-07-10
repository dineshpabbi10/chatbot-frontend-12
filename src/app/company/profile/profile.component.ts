import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userDetails:any = null;
  public fileName:any = null;
  public userDetailForm: FormGroup = new FormGroup(
    {
      "profile_pic": new FormControl(this.userDetails?.profile_pic, [Validators.required]),
      "first_name": new FormControl(this.userDetails?.first_name, [Validators.required]),
      "last_name": new FormControl(this.userDetails?.last_name, [Validators.required]),
      "mobile_no": new FormControl(this.userDetails?.mobile_no, [Validators.required]),
      "email": new FormControl(this.userDetails?.email, [Validators.required]),
    }
  );

  constructor(private companyService:CompanyService,private toast:ToastrService,private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.fetchAgentDetails();
  }

  fetchAgentDetails() {
    this.companyService.getCompanyUserDetails()
      .pipe(catchError((err) => {
        this.toast.error(err.message);
        return of(err.message);
      }))
      .subscribe((res) => {
        if (res.status) {
          this.userDetails = res.data;
          this.userDetailForm.setValue({...this.userDetails,'profile_pic':null});
        }
      })
  }

  updateUserData() {
    this.loader.start();
    this.companyService.updateCompanyUserDetails(this.userDetailForm.value)
      .pipe(catchError(err => {
        this.toast.error(err.message);
        return of(err.message);
      }))
      .subscribe(res => {
        if (res.status) {
          this.toast.success(res.message);
          this.fetchAgentDetails();
          this.fileName = null;
        }
        this.loader.stop();
      })
  }

  setFile(event: any) {
    this.userDetailForm.patchValue({
      profile_pic: event.target.files[0]
    });
    this.fileName = event.target.files[0].name;
  }

}
