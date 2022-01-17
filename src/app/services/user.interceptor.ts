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

    console.log(this.router.url)
    if (this.router.url == "/login") {
      return next.handle(request);
    }
    if (this.router.url == "/register") {
      return next.handle(request);
    }



    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('company_token')) });


    return next.handle(request);
  }
}
