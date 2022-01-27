import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public intentList : any[] = []
  public cols = [
    { field: 'domain', header: 'Domain' },
    { field: 'intent', header: 'Intent' },
    { field: 'response', header: 'Response' },
    { field: 'user_say', header: 'User Response' }
];

  constructor(private companyService : CompanyService,private toast : ToastrService, private loader : NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loader.start("getIntentList");
    this.companyService.getIntentList()
    .pipe(catchError(err=>of("error")))
    .subscribe(res=>{
      if(res==="error"){
        this.toast.error("Error Fetching Intents list");
      }else{
        this.intentList = res.data;
      }
      this.loader.stop("getIntentList");
    })
  }

}
