import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {

  public selectedRows: any[] = [];


  @Input('cols')
  public cols: any[];

  @Input('data')
  public products: any[];

  @Input('component')
  public component: string = '';

  @Input('showDelete')
  public showDelete: boolean = false;

  @Input('showEdit')
  public showEdit: boolean = false;

  constructor(private companyService: CompanyService, private toast: ToastrService, private router: Router, private loader: NgxUiLoaderService) {
    this.cols = [];
    this.products = [];
  }

  ngOnInit(): void {
  }

  submitEditRecords() {
    if (this.selectedRows.length > 1) {
      this.toast.error("Cannot edit more than 1 record at a time. Please select only one record");
    }
    else if (this.selectedRows.length === 0) {
      this.toast.error("No records selected for editing");
    }
    else {
      // Use RxJs to communicate based on component
      this.companyService.sendSelectedRecord(this.component, "edit", this.selectedRows);
    }
  }

  submitDeleteRecords() {
    if (this.selectedRows.length === 0) {
      this.toast.error("No records selected for deletion");
    }
    else if (this.selectedRows.length > 1) {
      this.toast.error("Cannot delete more than 1 record at a time. Please select only one record");
    } else {
      // Use RxJs to communicate based on component
      this.companyService.sendSelectedRecord(this.component, "delete", this.selectedRows);
    }

  }


  // Function to view script
  printDiv(token: string) {
    // console.log(token)
    const uri = '<script data-id="chatbox">';
    const encoded = encodeURIComponent(uri);
    var val1 = "&lt;script data-id='chatbox' &gt;";
    var val2 = "&lt;/script&gt;";
    var a = window.open("", "", "height=500, width=500");
    a?.document.write("<html><body>");

    a?.document.write("Copy Script Paste In your website !" + "<br><br>");
    a?.document.write(val1 + "<br>");
    a?.document.write("var _chatbot = {}" + "<br>");
    a?.document.write('_chatbot.key = "' + token + '"' + "<br>");
    a?.document.write(
      'window.addEventListener("load", (event) => {' + "<br>"
    );
    a?.document.write(' c = document.createElement("script");' + "<br>");
    a?.document.write(
      's = document.getElementsByTagName("script")[0];' + "<br>"
    );
    a?.document.write("b = document.body;" + "<br>");
    a?.document.write(
      ' c.type = "text/javascript"; c.charset = "utf-8"; c.async = true;' +
      "<br>"
    );
    a?.document.write(
      'c.src = "https://www.cybot.co/static/chatbox/static/loader.js"; s.parentNode.insertBefore(c, s);});' +
      "<br>"
    );
    a?.document.write(val2);
    a?.document.write("</body></html>");
    a?.document.close();
  }

  redirectToBotSettings(data: any) {
    console.log(data)
    this.router.navigate(['/company/bot-settings/' + data.token])
  }

  downloadInvoice(data: any) {
    // this.loader.start()
    console.log(data)
    // this.companyService.downloadInvoice()
  }

}
