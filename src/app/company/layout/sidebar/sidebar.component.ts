import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public domainOpen:boolean = false;
  public intentsOpen:boolean = false;
  public entityOpen:boolean = false;
  public agentsOpen:boolean = false;

  public domainClass:boolean = false;
  public intentsClass:boolean = false;
  public entityClass:boolean = false;
  public agentsClass:boolean = false;

  @Input() 
  sidebarOpen:boolean = false;

  constructor(private router:Router) { }

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

  toggleDomainOpen(event:MouseEvent,type:string){
    event.preventDefault();
    if(type==="domain"){
      this.domainOpen = !this.domainOpen;
    }else if(type==="intents"){
      this.intentsOpen = !this.intentsOpen;
    }else if(type==="entity"){
      this.entityOpen = !this.entityOpen;
    }else if(type==="agents"){
      this.agentsOpen = !this.agentsOpen;
    }
  }

  checkRouteForClass(url:string){
    if(url.includes("company/domain")){
      this.domainClass = true;
      this.entityClass = false;
      this.intentsClass = false;
      this.agentsClass = false;
    }else if(url.includes("company/intents")){
      this.domainClass = false;
      this.entityClass = false;
      this.intentsClass = true;
      this.agentsClass = false;
    }else if(url.includes("company/entities")){
      this.domainClass = false;
      this.entityClass = true;
      this.intentsClass = false;
      this.agentsClass = false;
    }else if(url.includes("company/agents")){
      this.domainClass = false;
      this.entityClass = false;
      this.intentsClass = false;
      this.agentsClass = true;
    }
  }

}
