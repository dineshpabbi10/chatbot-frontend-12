import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-faq-upload',
  templateUrl: './faq-upload.component.html',
  styleUrls: ['./faq-upload.component.css'],
})
export class FaqUploadComponent implements OnInit {
  public domainsList: any[] = [];
  public uploadForm: FormGroup;
  public selectedFile:string = ''

  constructor(
    private companyService: CompanyService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.uploadForm = this.formBuilder.group({
      file: new FormControl(null,[Validators.required]),
      selectedDomain : new FormControl(null, [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {
    this.getDomainList();
  }

  getDomainList() {
    this.loader.start('getDomainsList');
    this.companyService
      .getDomainList()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((data) => {
        if (data.status) {
          this.domainsList = data.data;
        }
        this.loader.stop('getDomainsList');
      });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file')?.setValue(file);
      this.selectedFile = event.target.files[0].name;
    }
  }

  onSubmit() {
    this.loader.start();
    const formData = new FormData();
    formData.append('trainfile', this.uploadForm.get('file')?.value);
    formData.append("domain",this.uploadForm.get('selectedDomain')?.value);
    if (
      this.uploadForm.get('file')?.value.type === '.csv' ||
      this.uploadForm.get('file')?.value.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      this.uploadForm.get('file')?.value.type === 'application/vnd.ms-excel'
    ) {
      // Submit file
      this.companyService.uploadFile(formData).pipe(
        catchError(err=>{
          this.toast.error(err.message);
          return of(err);
        })
      ).subscribe(res=>{
        if(res.status === true){
          this.toast.success("File Uploaded Successfully");
          this.uploadForm.get('file')?.setValue(null);
          this.uploadForm.get('selectedDomain')?.setValue(null)
        }
        this.loader.stop();
      });
    }else{
      this.toast.error("Selected file should be of type csv or excel sheet");
      this.loader.stop();
    }
  }


}
