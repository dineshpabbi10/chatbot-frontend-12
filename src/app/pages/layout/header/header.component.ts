import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkIfUserLoggedIn: Boolean = false
  urlDashboard: any

  constructor(
    private ngxService: NgxUiLoaderService,
    private CommonService: CommonService,
    private toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {
    if (localStorage.getItem('company_token')) {
      this.checkIfUserLoggedIn = true
      this.urlDashboard = '/company'
    }
    else if (localStorage.getItem('agent_token')) {
      this.checkIfUserLoggedIn = true
      this.urlDashboard = '/agent'

    }
  }

  logout() {
    // console.log('helo')
    this.ngxService.start()
    this.CommonService.logout(null).subscribe(data => {
      console.log(data)
      if (data.status) {
        localStorage.removeItem('company_token')
        localStorage.removeItem('data')
        this.toastr.success(data.message, 'SUCCESS')
        // this.router.navigateByUrl('/')
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/login']).then(() => {
            window.location.reload()
          })
        );
      }
      else {
        this.toastr.error(data.message, 'ERROR')
      }
      this.ngxService.stop()
    })
  }

}
