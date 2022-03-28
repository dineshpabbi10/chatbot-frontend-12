import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styleUrls: ['./bot-settings.component.css']
})
export class BotSettingsComponent implements OnInit {

  botColor: string
  domain_token: string = ''
  public selectedFile: any = null;

  public form: FormGroup = new FormGroup({
    "chatbot_name": new FormControl(''),
    "chatbot_color": new FormControl(''),
    "bot_icon": new FormControl(''),
    "domain_token": new FormControl('')
  });


  constructor(private activatedRoute: ActivatedRoute, private companyService: CompanyService, public toastr: ToastrService, public loader: NgxUiLoaderService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getBotSettings(params.token)
      this.domain_token = params.token

    });
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.domain_token)
    this.form.patchValue({ domain_token: this.domain_token, bot_icon: this.selectedFile })

    console.log(this.form.value)
    this.loader.start()
    this.companyService.updateBotSettings(this.form.value).subscribe(data => {
      console.log(data)
      this.loader.stop()
    })
  }

  upload(event: any) {
    console.log(event.files[0])
    let file = event.files[0]
    this.selectedFile = file
    
  }

  getBotSettings(token: string) {
    this.companyService.getBotSetting(token).subscribe(data => {
      console.log(data)
      if (data.status) {
        this.form.patchValue({
          chatbot_name: data.data.chatbot_name,
          chatbot_color: data.data.chatbot_color,

        })

      }
      else {
        this.toastr.error('Something went wrong white fetching previous bot settings.', 'ERROR')
      }
    })

  }


  colorChange(evt: any) {
    console.log(evt.value)
    this.botColor = evt.value
    this.form.patchValue({ chatbot_color: evt.value })
  }

  onManualColorChange(evt: any) {

    this.form.patchValue({ chatbot_color: evt.target.value })
  }

  clearFile() {
    this.selectedFile = null
  }
}
