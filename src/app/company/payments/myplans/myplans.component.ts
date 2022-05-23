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
  public warningMsg: boolean = false
  public upComingPlan: any

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

  changePlan() {

    this.warningMsg = false
    this.loader.start()

    var userLoggedIn: any
    userLoggedIn = localStorage.getItem('data')
    userLoggedIn = JSON.parse(userLoggedIn)
    this.companyService.switchPlan(null).subscribe((data: any) => {
      
      if(data.status){
        userLoggedIn.subscribed = data.data.valid
        userLoggedIn.subscription_name = this.upComingPlan.subscription_name
        userLoggedIn.valid = data.data.valid
        
        userLoggedIn.expiry = data.data.expiry_date
        localStorage.setItem('data', JSON.stringify(userLoggedIn))
        
        this.toastr.success(data.data.message, 'SUCCESS')
        this.loader.stop()

      }
      else{
        this.toastr.error(data?.data.message, "Error")
        this.loader.stop()
      }
      // if (data.data.status) {
      //   this.toastr.success(data?.data.message, 'SUCCESS')
      // }
      // else {
      //   this.toastr.error(data?.data.message, "Error")
      // }
    })

  }

  triggerWarning(planDetail: any) {

    this.upComingPlan = planDetail
    this.warningMsg = true

  }

  closeModal() {
    this.upComingPlan = {}
    this.warningMsg = false
  }

}
