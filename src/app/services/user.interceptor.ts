import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class UserInterceptor implements HttpInterceptor {

  data = localStorage.getItem('data')
  constructor(private router: Router) { }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log(this.router.url)
    if (this.router.url == "/login" || this.router.url == "/register" || this.router.url == "/pricing" || this.router.url == "/password/forget" || this.router.url.includes("/password/reset")) {
      return next.handle(request);
    }

    if (localStorage.getItem('company_token') !== null) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('company_token')) });
    } else if (localStorage.getItem('agent_token') !== null) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('agent_token')) });
    }



    return next.handle(request).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        // console.log(error)
        if (error.status === 401) {

          localStorage.removeItem('company_token')
          localStorage.removeItem('agent_token')
          localStorage.removeItem('data')
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
      // if (evt.status == 401) {
      //   localStorage.removeItem('company_token')
      //   localStorage.removeItem('agent_token')
      //   localStorage.removeItem('data')
      //   this.router.navigateByUrl('/login');
      // }
    )
  }
}
