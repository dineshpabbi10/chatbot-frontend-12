import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserInterceptor } from "./services/user.interceptor";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from "ngx-ui-loader";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ToastrModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule
  ],

  providers: [UserInterceptor, { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }, ToastrModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
