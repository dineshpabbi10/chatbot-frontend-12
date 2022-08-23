import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { of } from 'rxjs';
import { mergeMapTo, catchError } from 'rxjs/operators';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private afMessaging: AngularFireMessaging,private commonService:CommonService) { }

  ngOnInit(): void {
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
