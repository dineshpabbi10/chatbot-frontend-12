import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkIfUserLoggedIn: Boolean = false
  urlDashboard: any

  constructor() { }

  ngOnInit(): void {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {
    if (localStorage.getItem('company_token')) {
      this.checkIfUserLoggedIn = true
      this.urlDashboard = '/company'
    }
    else if (localStorage.getItem('agent_token')) {
      this.checkIfUserLoggedIn = true
      this.urlDashboard = '/agent'

    }
  }

}
