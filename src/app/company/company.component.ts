import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CompanyService } from './services/company.service';
import { CommonService } from '../services/common.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public sidebarOpen = true;
  public smallScreen: boolean = false;
  public notificationsList:any[] = [];
  constructor(private afMessaging : AngularFireMessaging,private companyService: CompanyService,private CommonService: CommonService, private toastr: ToastrService, private ngxService: NgxUiLoaderService, public router: Router) { }

  ngOnInit(): void {
    this.smallScreen = window.innerWidth < 601;
    this.fetchNotifications(true);

    // Check for notifications from firebase
    this.afMessaging.messages.subscribe((_messaging:any) => {
      _messaging.onBackgroundMessage = _messaging?.onBackgroundMessage?.bind(_messaging); 
      
      // Send A message using a subject to refetch chatlist and notification
      this.CommonService.notificationSubject.next({
        received:true
      });

      this.fetchNotifications(false);
    });

    this.CommonService.notificationSubject$.subscribe(()=>{
      this.toastr.info("New Notitifications received !");
    });
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
    } else if (this.router.url == "/company/faq-upload") {
      return "Upload FAQ"
    } else if (this.router.url == "/company/web-link") {
      return "Web Link Integration"
    } else if (this.router.url == "/company/agents/add") {
      return "Add New Agent"
    } else if (this.router.url == "/company/agents") {
      return "View Agents"
    } else if (this.router.url == "/company/entities") {
      return "View Entities"
    } else if (this.router.url == "/company/entities/create") {
      return "Create Entities"
    } else if (this.router.url == "/company/payment") {
      return "Payments"
    } else if (this.router.url == "/company/training") {
      return "Training"
    }

    return "Not Found";
  }

  logout() {
    this.ngxService.start()
    this.CommonService.logout(null).subscribe((data:any) => {
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.smallScreen = window.innerWidth < 600;
  }

  fetchNotifications(withLoader:Boolean){
    if(withLoader){
      this.ngxService.start();
    }

    this.companyService.getNotifications().pipe(catchError(err => {
      this.toastr.error(err.message);
      return of(err.message);
    }))
    .subscribe((res:any) => {
      if (res.status) {
        this.notificationsList = res.data;
        this.notificationsList = this.notificationsList.filter((elem:any)=>elem.read !== true)
      }
      if(withLoader){
        this.ngxService.stop();
      }
    })
  }

  markAllRead(){
    this.ngxService.start();
    this.companyService.clearAllNotification().pipe(catchError(err => {
      this.toastr.error(err.message);
      return of(err.message);
    }))
    .subscribe((res:any) => {
      if (res.status) {
        this.toastr.success(res.message);
        this.fetchNotifications(true);
      }
      this.ngxService.stop();
    })
  }

  markAsRead(id:any){
    this.ngxService.start();
    this.companyService.clearNotificationById(id).pipe(catchError(err => {
      this.toastr.error(err.message);
      return of(err.message);
    }))
    .subscribe((res:any) => {
      if (res.status) {
        this.toastr.success(res.message);
        this.fetchNotifications(true);
      }
      this.ngxService.stop();
    })
  }

}
