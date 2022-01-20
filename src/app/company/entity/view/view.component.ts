import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public entityList : any[] = [];
  constructor(private companyService : CompanyService, private toast :ToastrService) { }

  ngOnInit(): void {
    this.companyService.getEntitiesList()
    .pipe(
      catchError(err=>{
        this.toast.error(err.message);
        return of(err.message);
      })
    ).subscribe(res=>{
      if(res.status){
        this.entityList = res.data;
      }
    })
  }

}
