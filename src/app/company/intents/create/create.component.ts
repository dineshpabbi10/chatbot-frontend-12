import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    public companyService: CompanyService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

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
      this.toaster.error('Message Already exists in user message list being created');
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
      this.companyService.addResponseMessages(this.responseMessage.value.trim());
      this.responseMessage.setValue('');
    } else if (
      this.companyService.checkDuplicateInArray(
        this.companyService.getResponseMessages(),
        this.responseMessage.value.trim()
      )
    ) {
      this.toaster.error('Message Already exists in response message list being created');
    }
  }

}
