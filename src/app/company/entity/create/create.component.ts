import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public entityWord: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public responseMessage: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public userMessage: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public selectedIntent: FormControl = new FormControl(null, [
    Validators.required,
  ]);

  public entityName: FormControl = new FormControl('', [
    Validators.required,
    this.companyService.noWhitespaceValidator,
  ]);

  public form : FormGroup =  new FormGroup({
    "responseMessage":this.responseMessage,
    "userMessage" : this.userMessage,
    "selectedIntent" : this.selectedIntent,
    "entityName" : this.entityName
  }
  );

  public intentList: any[] = [];

  constructor(public companyService : CompanyService,private toast : ToastrService, private loader : NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loader.start("getIntentList");
    this.companyService.getIntentListDropdown()
    .pipe(
      catchError(err=>{
        this.toast.error(err.message);
        return of(err.message);
      })
    ).subscribe(res=>{
      if(res.status){
        this.intentList = res.data;
      }
      this.loader.stop("getIntentList");
    });
  }

  addEntityWord() {
    if (
      this.entityWord.valid &&
      !this.companyService.checkDuplicateInArray(
        this.companyService.getEntityWords(),
        this.entityWord.value.trim()
      )
    ) {
      this.companyService.addEntityWords(
        this.entityWord.value.trim()
      );
      this.entityWord.setValue('');
    } else if (
      this.companyService.checkDuplicateInArray(
        this.companyService.getEntityWords(),
        this.entityWord.value.trim()
      )
    ) {
      this.toast.error(
        'Entity Word already exists in entity word list being created'
      );
    }
  }


  submitForm(){
    this.loader.start("submitForm");
    if(this.form.valid && this.companyService.getEntityWords().length > 0){
      this.companyService.createEntity({
        "entity_name":this.entityName.value.trim(),
        "entity_word":this.companyService.getEntityWords().join(";"),
        "message":this.userMessage.value.trim(),
        "response":this.responseMessage.value.trim(),
        "intent":this.selectedIntent.value,
    })
    .pipe(
      catchError(err=>{
        this.toast.error(err.message);
        return of(err.message);
      })
    )
    .subscribe(res=>{
      if(res.status){
        this.toast.success(res.message);
      }
      this.entityName.setValue('');
      this.userMessage.setValue('');
      this.responseMessage.setValue('');
      this.selectedIntent.setValue(null);
      this.loader.stop("submitForm");
    })
    }
  }

}
