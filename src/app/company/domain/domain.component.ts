import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  constructor(private CompanyService: CompanyService) { }

  ngOnInit(): void {
    this.getDomainList()
  }

  getDomainList() {
    this.CompanyService.getDomainList().subscribe(data => {
      console.log(data)
    })
  }

}
