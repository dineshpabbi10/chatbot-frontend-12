import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  public entityList: any[] = [];
  public updatePayload : any = {};
  public selectedRow:any = {};
  public cols = [
    { field: 'entity_name', header: 'Entity Name' },
    { field: 'entity_word', header: 'Entity Words' },
    { field: 'intent', header: 'Intent' },
    { field: 'message', header: 'User Message' },
    { field: 'response', header: 'Bot Response' },
    { field: 'intent_id', header: 'Intent Id' },
  ];

  public form : FormGroup = new FormGroup({
    newEntityName : new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator]),
    newEntityWords : new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator]),
    newMessage : new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator]),
    newResponse : new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator]),
  });


  constructor(
    private companyService: CompanyService,
    private toast: ToastrService,
    private loader: NgxUiLoaderService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    // Delete button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'entity' && data.action === 'delete') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            //Actual logic to perform a confirmation
            this.companyService.deleteEntity(data.payload[0]).
            pipe(catchError(err=>{
              this.toast.error(err.message);
              return of(err.message)
            }))
            .subscribe((res)=>{
              if(res.status){
                this.toast.success("Record successfully deleted");
              } 
              this.getEntityList();
            });
          },
        });
      }
    });

    this.companyService.sendSuccess$.subscribe((data)=>{
      if(data==="entity"){
        this.getEntityList();
      }
    });

    // Edit button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'entity' && data.action === 'edit') {
        this.selectedRow = data.payload[0];
      }
    });

    this.form.valueChanges.subscribe(data=>{
      this.updatePayload = {
        "entity_name":this.selectedRow.entity_name,
        "entity_word":this.selectedRow.entity_word,
        "message":this.selectedRow.message,
        "response":this.selectedRow.response,
        "newentity_name":this.form.get('newEntityName')?.value,
        "newentity_word":this.form.get('newEntityWords')?.value,
        "newmessage":this.form.get('newMessage')?.value,
        "newresponse":this.form.get('newResponse')?.value,
        "intent":this.selectedRow.intent,
        "intent_id":this.selectedRow.intent_id
    }
    })

    this.getEntityList();
    
  }

  getEntityList(){
    this.loader.start('getEntitiesList');
    this.companyService
      .getEntitiesList()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        if (res.status) {
          this.entityList = res.data;
        }
        this.loader.stop('getEntitiesList');
      });
  }
}
