import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public sidebarOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

}
