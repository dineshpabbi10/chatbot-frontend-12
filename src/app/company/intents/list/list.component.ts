import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private companyService : CompanyService,private toast : ToastrService) { }

  ngOnInit(): void {
    this.companyService.getIntentList()
    .pipe(catchError(err=>of("error")))
    .subscribe(res=>{
      if(res==="error"){
        this.toast.error("Error Fetching Intents list");
      }else{
        this.intentList = res.data;
      }
    })
  }

}
