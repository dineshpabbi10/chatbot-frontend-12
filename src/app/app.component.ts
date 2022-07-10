import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { of } from 'rxjs';
import { catchError, mergeMapTo } from 'rxjs/operators';
import { CommonService } from './services/common.service';
import {NavigationEnd, Router} from '@angular/router'
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'chatbot-frontend';

  constructor(private afMessaging: AngularFireMessaging, private commonService :CommonService, private router:Router,private metaService:Meta,private titleService:Title) { }

  ngOnInit(): void {
    
    // seo integration
    this.router.events.subscribe((event:any)=>{
      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar          
        this.commonService.getSeo(event.url)
        .subscribe((res:any)=>{
          this.titleService.setTitle(res.data.title);
          this.metaService.removeTag("name='description'");
          this.metaService.removeTag("name='keywords'");
          this.metaService.removeTag("name='slug'");
          this.metaService.addTags([
            {name:'description',content:res.data.description},
            {name:'keywords',content:res.data.keywords},
            {name:'slug',content:res.data.slug},
          ])
        })
      }
    })
    // Messaging Subscription
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { 
            // Send token to backend
            this.commonService.sendNotificationToken(token)
            .pipe(catchError(err=>{
              return of(err)
            }))
            .subscribe(res=>{
            })

        },
        (error) => { console.error(error); },  
      );
  }
}
