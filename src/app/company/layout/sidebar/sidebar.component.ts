import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public domainOpen: boolean = false;
  public intentsOpen: boolean = false;
  public entityOpen: boolean = false;
  public agentsOpen: boolean = false;
  public paymentsOpen: boolean = false
  public botsOpen: boolean = false

  public domainClass: boolean = false;
  public intentsClass: boolean = false;
  public entityClass: boolean = false;
  public agentsClass: boolean = false;
  public paymentClass: boolean = false
  public botClass: boolean = false

  @Input()
  sidebarOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.checkRouteForClass(this.router.url);

    // subscribe to router navigation
    this.router.events.subscribe(event => {
      // filter `NavigationEnd` events
      if (event instanceof RouterEvent) {
        // get current route without leading slash `/`
        const eventUrl = /(?<=\/).+/.exec(event.url);
        const currentRoute = (eventUrl || []).join('');
        // set bgClass property with the value of the current route
        this.checkRouteForClass(currentRoute);
      }
    });
  }

  toggleDomainOpen(event: MouseEvent, type: string) {
    event.preventDefault();
    // console.log(type)
    if (type === "domain") {
      this.domainOpen = !this.domainOpen;
    } else if (type === "intents") {
      this.intentsOpen = !this.intentsOpen;
    } else if (type === "entity") {
      this.entityOpen = !this.entityOpen;
    } else if (type === "agents") {
      this.agentsOpen = !this.agentsOpen;
    } else if (type === "payments") {
      this.paymentsOpen = !this.paymentsOpen
    } else if (type === "integration") {
      this.botsOpen = !this.botsOpen
    }

  }

  checkRouteForClass(url: string) {
    if (url.includes("company/domain")) {
      this.domainClass = true;
      this.entityClass = false;
      this.intentsClass = false;
      this.agentsClass = false;
      this.paymentClass = false
      this.botClass = false

    } else if (url.includes("company/intents")) {
      this.domainClass = false;
      this.entityClass = false;
      this.intentsClass = true;
      this.agentsClass = false;
      this.paymentClass = false
      this.botClass = false

    } else if (url.includes("company/entities")) {
      this.domainClass = false;
      this.entityClass = true;
      this.intentsClass = false;
      this.agentsClass = false;
      this.paymentClass = false
      this.botClass = false

    } else if (url.includes("company/agents")) {
      this.domainClass = false;
      this.entityClass = false;
      this.intentsClass = false;
      this.agentsClass = true;
      this.paymentClass = false
      this.botClass = false

    } else if (url.includes("company/payments") || url.includes("company/my-plans") || url.includes("company/invoices") ) {
      this.paymentClass = true
      this.domainClass = false;
      this.entityClass = false;
      this.intentsClass = false;
      this.agentsClass = false
      this.botClass = false
    } else if (url.includes("company/weblink")) {
      this.botClass = true
      this.paymentClass = false
      this.domainClass = false;
      this.entityClass = false;
      this.intentsClass = false;
      this.agentsClass = false
    }

    else {
      this.paymentClass = false
      this.domainClass = false;
      this.entityClass = false;
      this.intentsClass = false;
      this.agentsClass = false;
      this.botClass = false

    }
  }

}
