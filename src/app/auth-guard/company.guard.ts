import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {

  userDetails: any = {}

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userDetails = localStorage.getItem("data")
    this.userDetails = JSON.parse(this.userDetails)
    if (localStorage.getItem('company_token')) {
      if (this.userDetails.subscribed == false && this.userDetails.valid == false) {
        this.router.navigate(["pricing"])
        // this.toastr.warning('Please subscribe to a plan first!', 'WARNING')
        alert("Please select a plan you want to proceed with!")
        return false
      }
      return true
    } else {
      this.router.navigate(["/login"]);
      return false
    }

    // return true;
  }

}
