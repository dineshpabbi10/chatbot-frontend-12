import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class UserInterceptor implements HttpInterceptor {

  data = localStorage.getItem('data')
  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log(this.router.url)
    if (this.router.url == "/login" || this.router.url == "/register" || this.router.url == "/pricing" || this.router.url == "/password/forget" || this.router.url.includes("/password/reset")) {
      return next.handle(request);
    }

    if(localStorage.getItem('company_token') !== null){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('company_token')) });
    }else if(localStorage.getItem('agent_token') !== null){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('agent_token')) });
    }
    


    return next.handle(request);
  }
}
