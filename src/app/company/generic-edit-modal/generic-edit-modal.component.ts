import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-generic-edit-modal',
  templateUrl: './generic-edit-modal.component.html',
  styleUrls: ['./generic-edit-modal.component.css']
})
export class GenericEditModalComponent implements OnInit {

  @Input('header')
  public header : string = '';

  @Input('data')
  public data : any = {};

  @Input('component')
  public component : string  = '';

  public display :boolean = false;

  constructor(private companyService:CompanyService,private toast:ToastrService,private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.companyService.selectedRecord$.subscribe(data=>{
      if(data.action==="edit"){
        this.openDisplay();
      }
    })
  }

  openDisplay(){
    this.display = true;
  }

  closeDisplay(){
    this.display = false;
  }

  submitUpdate(){
    this.loader.start();
    this.companyService.submitUpdate(this.component,this.data)?.pipe(
      catchError(err=>{
        this.toast.error(err.message);
        return of(err.message);
      })
    ).subscribe(res=>{
      if(res.status){
        this.toast.success(res.message);
        this.companyService.sendSuccessMessage(this.component);
        this.closeDisplay();
      }
      this.loader.stop();
    })
  }


}
