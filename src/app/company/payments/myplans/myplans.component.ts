import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-myplans',
  templateUrl: './myplans.component.html',
  styleUrls: ['./myplans.component.css']
})
export class MyplansComponent implements OnInit {

  public myPlansList: any[] = []
  public cols = [
    { field: 'subscription_name', header: 'Plan Name' },
    { field: 'transaction_date', header: 'Purchase Date' },
    { field: 'valid', header: 'Valid' },
    { field: 'active', header: 'Active' }
  ]


  constructor(private companyService: CompanyService, private loader: NgxUiLoaderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMyPlans()
  }


  getMyPlans() {
    this.loader.start()
    this.companyService.getMyPlan().subscribe(data => {
      if (data.status) {
        this.myPlansList = data.data
      }
      else {
        this.toastr.error(data.message, 'ERROR')
      }
      this.loader.stop()
    })
  }

}
