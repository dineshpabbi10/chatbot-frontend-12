import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css'],
})
export class QuicklinksComponent implements OnInit {
  public domains: any[] = [];
  public loadedQuickLinks : any[] = []

  public quickLinkText: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    this.companyService.noWhitespaceValidator,
  ]);

  public selectedDomain: FormControl = new FormControl(null, [
    Validators.required,
  ]);

  public selectedDomainFilter: FormControl = new FormControl(null, [
    Validators.required,
  ]);

  public message: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public quicklinksArray: FormControl = new FormControl(
    this.companyService.getQuickLinks(),
    [this.companyService.arraySizeValidator()]
  );

  public form: FormGroup = new FormGroup({
    selectedDomain: this.selectedDomain,
    message: this.message,
    quickLinksArray: this.quicklinksArray,
  });

  constructor(
    public companyService: CompanyService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.loader.start();
    this.companyService
      .getDomainList()
      .pipe(
        catchError((err) => {
          this.toaster.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        if (res.status) {
          this.domains = res.data;
        }
        this.loader.stop();
      });

    this.selectedDomainFilter.valueChanges.subscribe(value=>{
      this.loader.start();

      if(value !== null){
      this.companyService.getQuickLinkFromBackend(value).pipe(
        catchError(err=>{
          this.toaster.error(err.message);
          return of(err.message);
        })
      ).subscribe(res=>{
        if(res.status){
          this.loadedQuickLinks = res.data;
        }
        this.loader.stop();
      })
    }else{
      this.loadedQuickLinks = [];
      this.loader.stop();
    }

      
    })
  }

  addQuickLink() {
    if (
      this.companyService.checkDuplicateInArray(
        this.companyService.getQuickLinks(),
        this.quickLinkText.value.trim()
      )
    ) {
      this.toaster.error('Quicklink already exists in list being created');
    } else {
      this.companyService.addQuickLink(this.quickLinkText.value.trim());
      this.quicklinksArray.setValue(this.companyService.getQuickLinks());
      this.quickLinkText.setValue('');
    }
  }

  submitForm(){
    this.loader.start();
    this.companyService.createQuickLink(
      {
        domain: this.selectedDomain.value,
        message: this.message.value,
        quicklinks: this.quicklinksArray.value,
      }
    ).pipe(
      catchError(err=>{
        this.toaster.error(err.message);
        return of(err.message);
      })
    ).subscribe(res=>{
      if(res.status){
        this.toaster.success(res.message);
      }
      this.companyService.clearQuickLink();
      this.selectedDomain.setValue(null);
      this.message.setValue(null);
      this.quicklinksArray.setValue(this.companyService.getQuickLinks());
      this.loader.stop();
    });

    this.companyService.getQuickLinkFromBackend(this.selectedDomainFilter.value).pipe(
      catchError(err=>{
        this.toaster.error(err.message);
        return of(err.message);
      })
    ).subscribe(res=>{
      if(res.status){
        this.loadedQuickLinks = res.data;
      }
      this.loader.stop();
    })


  }
}
