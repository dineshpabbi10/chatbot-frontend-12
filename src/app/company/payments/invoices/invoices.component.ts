import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  public transactionList: any[] = [];
  public cols = [
    { field: 'transaction_id', header: 'Transaction Id' },
    { field: 'transaction_date', header: 'Transaction Date' },
    { field: 'currency', header: 'Currency' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
  ]

  constructor(private companyService: CompanyService, private loader: NgxUiLoaderService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.funcGetTransactions()

  }


  funcGetTransactions() {
    this.loader.start();
    this.companyService.getTransactions().subscribe(data => {
      // console.log(data)
      if (data.status) {
        this.transactionList = data.data
      }
      else {
        this.toastr.error(data.message, 'ERROR')

      }
      this.loader.stop()
    })
  }

}
