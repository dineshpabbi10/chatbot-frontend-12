import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public entityWord: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public responseMessage: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public userMessage: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public selectedDomain: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  public entityName: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public domainsList: any[] = [];

  constructor(public companyService : CompanyService) { }

  ngOnInit(): void {
  }

}
