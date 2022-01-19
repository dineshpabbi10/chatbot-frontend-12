import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css'],
})
export class QuicklinksComponent implements OnInit {
  public quickLinkText: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    this.companyService.noWhitespaceValidator,
  ]);

  constructor(
    public companyService: CompanyService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

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
      this.quickLinkText.setValue('');
    }
  }
}
