import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClientCustom } from '../core/http-client-custom.service';
import { Credentials } from '../models/credentials';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalEventService } from './global-event.service';
import { btoa } from '../utils/variables';
import { tap } from 'rxjs/operators';
import * as storage from 'nativescript-localstorage';
import { Enroll } from '../models/enroll';
import { ToastHelperService } from '../core/toast-helper.service';
import { UserData } from '../models/user-data';

const HASH = 'hash';
const CREDENTIALS = 'credentials';

@Injectable({ providedIn: 'root' })
export class AccountService extends BaseService {
  
  private subject = new BehaviorSubject(new UserData());
  userData$: Observable<UserData> = this.subject.asObservable();

  constructor(
    private globalEvent: GlobalEventService,
    protected httpClient: HttpClientCustom,
    private toastHepler: ToastHelperService
  ) {
    super(httpClient, '/access');
  }

  login(credential: Credentials): Observable<any> {
    return this.action('/login', credential).pipe(
      tap(res => {
        if (res.success) {
          this.saveSession(res.content.hash, credential);
          this.subject.next(res.content);
        } else {
          this.toastHepler.showToast(`${res.errors[0].message} `);
        }
      })
    );
  }

  logout(): void {
    storage.clear();
    this.globalEvent.disconneted.emit();
    this.subject.next(new UserData());
  }

  isLogged(): boolean {
    const logged: boolean = storage.getItem(CREDENTIALS) ? true : false;
    return logged;
  }

  getSession(): string {
    return storage.getItem(CREDENTIALS);
  }

  saveRegister(enroll: Enroll): Observable<any> {
    return this.save('/enroll', enroll).pipe(
      tap(res => {
        if (!res.success) {
          this.toastHepler.showToast(`${res.errors[0].message} `);
        }
      })
    );
  }

  private saveSession(hash: string, credential: Credentials): void {
    storage.setItem(HASH, hash);
    storage.setItem(CREDENTIALS, btoa(credential));
    this.globalEvent.loggedIn.emit();
  }
}
