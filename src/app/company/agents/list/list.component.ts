import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
    { field: 'human_agent', header: 'Name' },
    { field: 'company', header: 'Company' },
    { field: 'no_of_chats', header: 'No. Of Chats' },
    { field: 'online', header: 'Online' },
    { field: 'chat_history', header: 'Chat History' },
];

  constructor(
    private companyService: CompanyService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.loader.start();
    this.companyService.getHumanAgents().pipe(
      catchError(err=>{
        this.toast.error(err.message);
        return of(err.message);
      })
    ).subscribe(res=>{
      if(res.status){
        this.agentList = res.data;
      }
      this.loader.stop();
    });

  }

}
