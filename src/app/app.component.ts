import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs/operators';
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
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },  
      );

    this.afMessaging.messages.subscribe((_messaging:any) => {
      _messaging.onBackgroundMessage = _messaging?.onBackgroundMessage?.bind(_messaging); 
      
      // Send A message using a subject to refetch chatlist and notification
      this.commonService.notificationSubject.next({
        received:true
      });
  })
  }
}
