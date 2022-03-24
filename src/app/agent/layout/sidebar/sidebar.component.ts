import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AgentServiceService } from '../../services/agent-service.service';
import { environment } from 'src/environments/environment.prod';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service'
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public items: MenuItem[] = [];
  public activeSection: string = "";
  public agentName = "";
  public editImagePopup = false;
  public agentDetails: any = null;
  public agentDetailForm: FormGroup = new FormGroup(
    {
      "profile_pic": new FormControl(this.agentDetails?.profile_pic, [Validators.required]),
      "first_name": new FormControl(this.agentDetails?.first_name, [Validators.required]),
      "last_name": new FormControl(this.agentDetails?.last_name, [Validators.required]),
      "mobile_no": new FormControl(this.agentDetails?.mobile_no, [Validators.required]),
      "email": new FormControl(this.agentDetails?.email, [Validators.required]),
    }
  );
  public baseUrl = environment.endPoint;
  public hasFileSelected = false;
  public notificationsList : any[] = [];

  @ViewChild("profilePicUpload")
  private profilePicUpload: any;

  constructor(
    private agentService: AgentServiceService,
    public loader: NgxUiLoaderService,
    public toast: ToastrService,
    public CommonService: CommonService,
    public router: Router,
    private afMessaging:AngularFireMessaging
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("data") !== null) {
      let name: any = JSON.parse(localStorage.getItem("data") || "{}");
      this.agentName = name.name;
    }

    this.fetchAgentDetails();
    this.fetchNotifications(true);

    // Check for notifications from firebase
    this.afMessaging.messages.subscribe((_messaging:any) => {
      _messaging.onBackgroundMessage = _messaging?.onBackgroundMessage?.bind(_messaging); 
      
      // Send A message using a subject to refetch chatlist and notification
      this.CommonService.notificationSubject.next({
        received:true
      });

      this.fetchNotifications(false);
  })

    // listen for page changes
    this.agentService.chatSubject$.subscribe((page) => {
      this.activeSection = page;
    })

    this.items = [{
      label: 'Inbox',
      items: [
        { label: 'Live Chat', icon: 'pi pi-fw pi-plus' },
        { label: 'Incoming Requests', icon: 'pi pi-fw pi-download' }
      ]
    },
    {
      label: 'History',
      items: [
        { label: 'Resolved Chats', icon: 'pi pi-fw pi-user-plus' },
        { label: 'Unresolved Chats', icon: 'pi pi-fw pi-user-minus' }
      ]
    }];


  }

  sendSelectedPage(page: string): void {
    this.agentService.sendChatPageInfo(page);
  }

  openEditPopup() {
    this.editImagePopup = true;
  }

  closeEditPopup() {
    this.editImagePopup = false;
  }

  fetchAgentDetails() {
    this.agentService.getAgentDetails()
      .pipe(catchError((err) => {
        this.toast.error(err.message);
        return of(err.message);
      }))
      .subscribe((res) => {
        if (res.status) {
          this.agentDetails = res.data;
          this.agentDetailForm.setValue({...this.agentDetails,'profile_pic':null});
        }
      })
  }

  setFile(event: any) {
    this.agentDetailForm.setValue({
      ...this.agentDetailForm.value,
      profile_pic: event.files[0]
    });
    this.hasFileSelected = true;
  }

  onClearFile() {
    this.hasFileSelected = false;
  }

  updateAgentData() {
    this.loader.start();
    this.agentService.updateAgentDetails(this.agentDetailForm.value)
      .pipe(catchError(err => {
        this.toast.error(err.message);
        return of(err.message);
      }))
      .subscribe(res => {
        if (res.status) {
          this.toast.success(res.message);
          this.fetchAgentDetails();
          this.closeEditPopup();
          this.profilePicUpload.clear();
        }
        this.loader.stop();
      })
  }

  logout() {
    this.loader.start()
    this.CommonService.logout(null).subscribe(data => {
      console.log(data)
      if (data.status) {
        localStorage.removeItem('company_token')
        localStorage.removeItem('data')
        localStorage.removeItem('agent_token')
        this.toast.success(data.message, 'SUCCESS')
        // this.router.navigateByUrl('/')
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/login']).then(() => {
            window.location.reload()
          })
        );
      }
      else {
        this.toast.error(data.message, 'ERROR')
      }
      this.loader.stop()
    })
  }

  fetchNotifications(withLoader:Boolean){
    if(withLoader){
      this.loader.start();
    }

    this.agentService.getNotifications().pipe(catchError(err => {
      this.toast.error(err.message);
      return of(err.message);
    }))
    .subscribe(res => {
      if (res.status) {
        this.notificationsList = res.data;
      }
      if(withLoader){
        this.loader.stop();
      }
    })
  }

  markAllRead(){
    this.loader.start();
    this.agentService.clearAllNotification().pipe(catchError(err => {
      this.toast.error(err.message);
      return of(err.message);
    }))
    .subscribe(res => {
      if (res.status) {
        this.toast.success(res.message);
        this.fetchNotifications(true);
      }
      this.loader.stop();
    })
  }

  markAsRead(id:any){
    this.loader.start();
    this.agentService.clearNotificationById(id).pipe(catchError(err => {
      this.toast.error(err.message);
      return of(err.message);
    }))
    .subscribe(res => {
      if (res.status) {
        this.toast.success(res.message);
        this.fetchNotifications(true);
      }
      this.loader.stop();
    })
  }

}
