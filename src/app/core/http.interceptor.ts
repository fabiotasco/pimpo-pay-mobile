import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { openRoute, btoa } from '../utils/variables';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders;
    console.log(req.url);
    if (this.accountService.isLogged()) {
      headers = req.headers
        .set('Authorization', 'Basic ' + this.accountService.getSession())
        .set('Content-Type', 'application/json');
    } else if (openRoute(req.url)) {
      const token = btoa({ username: 'Pimpo Pay', password: 'Pimpo Pay Test' });
      headers = req.headers.set('Authorization', 'Basic ' + token).set('Content-Type', 'application/json');
    }

    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
