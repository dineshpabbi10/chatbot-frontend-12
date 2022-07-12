import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public agentList: any[] = [];
  public cols = [
    { field: 'name', header: 'Name' },
    { field: 'username', header: 'Email' },
    { field: 'no_of_chats', header: 'No. Of Chats' },
    { field: 'online', header: 'Online' },
    { field: 'suspended', header: 'Is Suspended' }
  ];

  constructor(
    private companyService: CompanyService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    // Delete button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'agents' && data.action === 'delete') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to delete this record?',
          accept: () => {
            //Actual logic to perform a confirmation
            // console.log(data);
          },
        });
      }
    });

    // Edit button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'agents' && data.action === 'edit') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform insert action?',
          accept: () => {
            //Actual logic to perform a confirmation
            // console.log(data);
          },
        });
      }
    });

    this.loader.start();
    this.companyService
      .getHumanAgents()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        if (res.status) {
          this.agentList = res.data.allagent;
        }
        this.loader.stop();
      });
  }

  suspendToggle(email: any, status: string) {
    this.loader.start();
    let d = false
    if (status == "activate") {
      d = true
    }
    var body = {
      "agent_email": email,
      "activate": d
    }
    this.companyService.suspendHumanAgent(body).subscribe((res: any) => {
      if (res.status) {
        this.toast.success(res.message, 'SUCCESS')
        this.ngOnInit()
      }
      this.loader.stop()
    })

    console.log(email)
    console.log(status)
  }
}
