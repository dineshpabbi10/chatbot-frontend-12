import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public intentList: any[] = [];
  public selectedRow: any;
  public form : FormGroup = new FormGroup({
    newIntent : new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator]),
    newUserSay : new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator]),
    newResponse : new FormControl('',[Validators.required,this.companyService.noWhitespaceValidator])
  });
  public updatePayload : any = {};

  public cols = [
    { field: 'domain', header: 'Domain' },
    { field: 'intent', header: 'Intent' },
    { field: 'response', header: 'Response' },
    { field: 'user_say', header: 'User Response' },
  ];
 
  constructor(
    private companyService: CompanyService,
    private toast: ToastrService,
    private loader: NgxUiLoaderService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    // Delete button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'intents' && data.action === 'delete') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            //Actual logic to perform a confirmation
            this.companyService.deleteIntent(data.payload[0]).
            pipe(catchError(err=>{
              this.toast.error(err.message);
              return of(err.message)
            }))
            .subscribe((res)=>{
              if(res.status){
                this.toast.success("Record successfully deleted");
              } 
              this.getIntentList();
            });
          },
        });
      }
    });

    this.companyService.sendSuccess$.subscribe((data)=>{
      if(data==="intents"){
        this.getIntentList();
      }   
    });

    // subscribe to edit change
    this.form.valueChanges.subscribe((data)=>{
      this.updatePayload = 
        {
          "intent": this.selectedRow?.intent,
          "user_say": this.selectedRow?.user_say,
          "response": this.selectedRow?.response,
          "domain": this.selectedRow?.domain,
          "newintent": this.form.get("newIntent")?.value,
          "newuser_say": this.form.get("newUserSay")?.value,
          "newresponse": this.form.get("newResponse")?.value
        }
    })
    

    // Edit button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'intents' && data.action === 'edit') {
        this.selectedRow = data.payload[0];
      }
    });

    this.getIntentList();
    
    
  }

  getIntentList(){
    this.loader.start('getIntentList');
    this.companyService
      .getIntentList()
      .pipe(catchError((err) => of('error')))
      .subscribe((res) => {
        if (res === 'error') {
          this.toast.error('Error Fetching Intents list');
        } else {
          this.intentList = res.data;
        }
        this.loader.stop('getIntentList');
      });
  }
}
