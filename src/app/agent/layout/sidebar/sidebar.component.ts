import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MenuItem} from 'primeng/api';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AgentServiceService } from '../../services/agent-service.service';
import { environment } from 'src/environments/environment.prod';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public items: MenuItem[] = [];
  public activeSection : string = "";
  public agentName = "";
  public editImagePopup = false;
  public agentDetails :any  = null;
  public agentDetailForm : FormGroup = new FormGroup(
    {
        "profile_pic": new FormControl(this.agentDetails?.profile_pic,[Validators.required]),
        "first_name": new FormControl(this.agentDetails?.first_name,[Validators.required]),
        "last_name": new FormControl(this.agentDetails?.last_name,[Validators.required]),
        "mobile_no": new FormControl(this.agentDetails?.mobile_no,[Validators.required]),
        "email": new FormControl(this.agentDetails?.email,[Validators.required]),
    }
  );
  public baseUrl = environment.endPoint;
  
  @ViewChild("profilePicUpload")
  private profilePicUpload : any;

  constructor(private agentService: AgentServiceService,private toast: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem("data") !== null){
      let name : any = JSON.parse(localStorage.getItem("data") || "{}");
      this.agentName = name.name;
    }

    this.fetchAgentDetails();

    // listen for page changes
    this.agentService.chatSubject$.subscribe((page)=>{
      this.activeSection = page;
    })

    this.items = [{
      label: 'Inbox',
      items: [
          {label: 'Live Chat', icon: 'pi pi-fw pi-plus'},
          {label: 'Incoming Requests', icon: 'pi pi-fw pi-download'}
        ]
      },
      {
          label: 'History',
          items: [
              {label: 'Resolved Chats', icon: 'pi pi-fw pi-user-plus'},
              {label: 'Unresolved Chats', icon: 'pi pi-fw pi-user-minus'}
          ]
      }];


  }

  sendSelectedPage(page:string):void{
    this.agentService.sendChatPageInfo(page);
  }

  openEditPopup(){
    this.editImagePopup = true;
  }

  closeEditPopup(){
    this.editImagePopup = false;
  }

  fetchAgentDetails(){
    this.agentService.getAgentDetails()
    .pipe(catchError((err)=>{
      this.toast.error(err.message);
      return of(err.message);
    }))
    .subscribe((res)=>{
      if(res.status){
        this.toast.success(res.message);
        this.agentDetails = res.data;
        this.agentDetailForm.setValue(this.agentDetails);
      }
    })
  }

  setFile(event:any){
    this.agentDetailForm.setValue({
      ...this.agentDetailForm.value,
      profile_pic : event.files[0]
    });
  }

  updateAgentData(){
    this.agentService.updateAgentDetails(this.agentDetailForm.value)
    .pipe(catchError(err=>{
      this.toast.error(err.message);
      return of(err);
    }))
    .subscribe(res=>{
      if(res.status){
        this.toast.success(res.message);
        this.fetchAgentDetails();
        this.closeEditPopup();
        this.profilePicUpload.clear();
      }
    })
  }

}
