import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { of } from 'rxjs';
import { catchError, mergeMapTo } from 'rxjs/operators';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'chatbot-frontend';

  constructor(private afMessaging: AngularFireMessaging, private commonService :CommonService) { }

  ngOnInit(): void {
    // Messaging Subscription
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { 
            // Send token to backend
            console.log(token);
            this.commonService.sendNotificationToken(token)
            .pipe(catchError(err=>{
              return of(err)
            }))
            .subscribe(res=>{
              console.log(res);
            })

        },
        (error) => { console.error(error); },  
      );
  }
}
