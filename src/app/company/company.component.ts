import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public sidebarOpen = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  getTitle(){
    if(this.router.url === "/company/dashboard"){
      return "Dashboard";
    }else if(this.router.url === "/company/quicklinks"){
      return "Quicklinks"
    }else if (this.router.url ==="/company/domain"){
      return "Domain"
    }
    return "Not Found";
  }

}
