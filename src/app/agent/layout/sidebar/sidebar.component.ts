import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AgentServiceService } from '../../services/agent-service.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader'
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public items: MenuItem[] = [];
  public activeSection: string = "";
  public agentName = "";

  constructor(
    private agentService: AgentServiceService,
    public loader: NgxUiLoaderService,
    public toast: ToastrService,
    public CommonService: CommonService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("data") !== null) {
      let name: any = JSON.parse(localStorage.getItem("data") || "{}");
      this.agentName = name.name;
    }


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

}
