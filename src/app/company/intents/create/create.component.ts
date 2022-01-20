import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public userMessage: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public responseMessage: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public selectedDomain: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  public intentName: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public domainsList: any[] = [];

  constructor(
    public companyService: CompanyService,
    private toaster: ToastrService,
    private loader : NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.loader.start("getDomainsList");
    this.companyService
      .getDomainList()
      .subscribe((data) => {
        this.domainsList = data.data;
        this.loader.stop("getDomainsList");
      });
  }

  addMessage() {
    if (
      this.userMessage.valid &&
      !this.companyService.checkDuplicateInArray(
        this.companyService.getUserMessages(),
        this.userMessage.value
      )
    ) {
      this.companyService.addUserMessages(this.userMessage.value.trim());
      this.userMessage.setValue('');
    } else if (
      this.companyService.checkDuplicateInArray(
        this.companyService.getUserMessages(),
        this.userMessage.value.trim()
      )
    ) {
      this.toaster.error(
        'Message Already exists in user message list being created'
      );
    }
  }

  addResponseMessage() {
    if (
      this.responseMessage.valid &&
      !this.companyService.checkDuplicateInArray(
        this.companyService.getResponseMessages(),
        this.responseMessage.value.trim()
      )
    ) {
      this.companyService.addResponseMessages(
        this.responseMessage.value.trim()
      );
      this.responseMessage.setValue('');
    } else if (
      this.companyService.checkDuplicateInArray(
        this.companyService.getResponseMessages(),
        this.responseMessage.value.trim()
      )
    ) {
      this.toaster.error(
        'Message Already exists in response message list being created'
      );
    }
  }

  submitForm() {
    this.loader.start("submitForm");
    if (
      this.intentName.valid &&
      this.selectedDomain.valid &&
      this.companyService.getResponseMessages().length > 0 &&
      this.companyService.getUserMessages().length > 0
    ) {
      this.companyService.createIntent({
        "intent":this.intentName.value,
        "user_say":this.companyService.getUserMessages().join(";"),
        "response":this.companyService.getResponseMessages().join(";"),
        "domain":this.selectedDomain.value
      }).pipe(catchError(err=>of("error")))
      .subscribe(res=>{
        if(res !== "error"){
          this.toaster.success("Intent created successfully");
          this.selectedDomain.setValue(null);
          this.intentName.setValue('');
          this.companyService.clearResponseMessages();
          this.companyService.clearUserMessages();
        }
        this.loader.stop("submitForm");
      })
    }else{
      this.toaster.error("Error sending request, Data entered in form invalid or missing");
    }
  }
}
