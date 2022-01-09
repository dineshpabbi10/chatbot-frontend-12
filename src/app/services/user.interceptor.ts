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

  token: any = localStorage.getItem('user_token')
  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if (this.router.url == "/login") {
      return next.handle(request);
    }
    if (this.router.url == "/signup") {
      return next.handle(request);
    }

    request = request.clone({ headers: request.headers.set('x-access-token', localStorage.getItem('tokenTullius') || '') });


    return next.handle(request);
  }
}
