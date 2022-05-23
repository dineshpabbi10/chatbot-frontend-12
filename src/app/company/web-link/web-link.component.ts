import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-web-link',
  templateUrl: './web-link.component.html',
  styleUrls: ['./web-link.component.css'],
})
export class WebLinkComponent implements OnInit {
  public domainsList: any[] = [];
  public uploadForm: FormGroup;
  public websiteList: any[] = [];
  public cols = [
    { field: 'domain_name', header: 'Domain' },
    { field: 'domain', header: 'Website' },
    { field: 'port', header: 'Port' },
    { field: 'user', header: 'Total Users' },
    { field: 'user_info', header: 'User Info' },
    { field: 'expiry', header: 'Expiration' },
    { field: 'token', header: 'View Script' },
  ];

  constructor(
    private companyService: CompanyService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.uploadForm = this.formBuilder.group({
      website: new FormControl(null, [Validators.required]),
      selectedDomain: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Delete button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'web-link' && data.action === 'delete') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            //Actual logic to perform a confirmation
            this.companyService.deleteWebLinToken(data.payload[0].token).
              pipe(catchError(err => {
                this.toast.error(err.message);
                return of(err.message)
              }))
              .subscribe((res) => {
                if (res.status) {
                  this.toast.success("Record successfully deleted");
                }
                this.getDomainList();
              });
          },
        });
      }
    });

    // Edit button clicked in generic table
    this.companyService.selectedRecord$.subscribe((data) => {
      if (data.component === 'web-link' && data.action === 'edit') {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform insert action?',
          accept: () => {
            //Actual logic to perform a confirmation

          },
        });
      }
    });

    this.getDomainList();
    this.getWebsiteList();
  }

  getDomainList() {
    this.loader.start('getDomainsList');
    this.companyService
      .getDomainList()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((data) => {
        // console.log(data)
        if (data.status) {
          this.domainsList = data.data;
        }
        this.loader.stop('getDomainsList');
      });
  }

  getWebsiteList() {
    this.loader.start();
    this.companyService
      .getWebsiteTokens()
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        // console.log(res)
        if (res.status) {
          this.websiteList = res.data;
        }
        this.loader.stop();
      });
  }

  onSubmit() {
    this.loader.start();
    const formData = new FormData();
    formData.append(
      'domain',
      'https://' + this.uploadForm.get('website')?.value
    );
    formData.append(
      'domain_name',
      this.uploadForm.get('selectedDomain')?.value
    );

    this.companyService
      .generateScript(formData)
      .pipe(
        catchError((err) => {
          this.toast.error(err.message);
          return of(err);
        })
      )
      .subscribe((res) => {
        if (res.status === true) {
          this.toast.success('Script Generated Successfully');
          this.printDiv(res.data.token);
          this.uploadForm.get('website')?.setValue(null);
          this.uploadForm.get('selectedDomain')?.setValue(null);
        }
        this.loader.stop();
        this.getWebsiteList();
      });
  }

  printDiv(token: string) {
    const uri = '<script data-id="chatbox">';
    const encoded = encodeURIComponent(uri);
    var val1 = "&lt;script data-id='chatbox' &gt;";
    var val2 = '&lt;/script&gt;';
    var a = window.open('', '', 'height=500, width=500');
    a?.document.write('<html><body>');

    a?.document.write('Copy Script Paste In your website !' + '<br><br>');
    a?.document.write(val1 + '<br>');
    a?.document.write('var _chatbot = {}' + '<br>');
    a?.document.write('_chatbot.key = "' + token + '"' + '<br>');
    a?.document.write('window.addEventListener("load", (event) => {' + '<br>');
    a?.document.write(' c = document.createElement("script");' + '<br>');
    a?.document.write(
      's = document.getElementsByTagName("script")[0];' + '<br>'
    );
    a?.document.write('b = document.body;' + '<br>');
    a?.document.write(
      ' c.type = "text/javascript"; c.charset = "utf-8"; c.async = true;' +
      '<br>'
    );
    a?.document.write(
      `c.src = "${environment.scriptUrl}/static/chatbox/static/loader.js"; s.parentNode.insertBefore(c, s);});` +
      '<br>'
    );
    a?.document.write(val2);
    a?.document.write('</body></html>');
    a?.document.close();
  }
}
