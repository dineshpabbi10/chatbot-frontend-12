import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css']
})
export class QuicklinksComponent implements OnInit {

  public quickLinkText:FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    this.noWhitespaceValidator
  ]);

  constructor(public companyService:CompanyService) { }

  ngOnInit(): void {
  }

  addQuickLink(){
    console.log("adding link");
    this.companyService.addQuickLink(this.quickLinkText.value.trim());
    console.log(this.companyService.getQuickLinks())
 
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
