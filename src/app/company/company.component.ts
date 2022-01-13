import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from './services/company.service'
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public sidebarOpen = true;
  constructor(private formBuilder: FormBuilder, private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router, private CompanyService: CompanyService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getTitle() {
    if (this.router.url === "/company/dashboard") {
      return "Dashboard";
    } else if (this.router.url === "/company/quicklinks") {
      return "Quicklinks"
    } else if (this.router.url === "/company/domain") {
      return "Domain"
    } else if (this.router.url === "/company/reporting") {
      return "Reporting"
    } else if (this.router.url == "/company/domain") {
      return "Domain";
    } else if (this.router.url == "/company/domain/create") {
      return "Create Domain"
    } else if (this.router.url == "/company/intents") {
      return "Intents"
    } else if (this.router.url == "/company/intents/create") {
      return "Create Intents"
    } else if(this.router.url == "/company/faq-upload"){
      return "Upload FAQ"
    } else if(this.router.url == "/company/web-link"){
      return "Web Link Integration"
    }else if(this.router.url == "/company/add-agent"){
      return "Add New Agent"
    }

    return "Not Found";
  }

  logout() {
    this.ngxService.start()
    this.CommonService.logout(null).subscribe(data => {
      if (data.status) {
        localStorage.removeItem('company_token')
        localStorage.removeItem('data')
        this.toastr.success(data.message, 'SUCCESS')
        this.router.navigate(['/'])
      }
      else {
        this.toastr.error(data.message, 'ERROR')
      }
      this.ngxService.stop()
    })
  }

}
