import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClientCustom } from '../core/http-client-custom.service';
import { Purchase } from '../models/purchase';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransactionService extends BaseService<TransactionService> {
  private subject: BehaviorSubject<number> = new BehaviorSubject(0);
  accountBalance$: Observable<number> = this.subject.asObservable();

  constructor(protected httpClient: HttpClientCustom) {
    super(httpClient, '/transactions');
  }

  executePurchase(purchase: Purchase): Observable<any> {
    return this.save('/purchase', purchase).pipe(
      tap((res: any) => {
        if (res.success) {
          this.getBalance();
        }
      })
    );
  }

  getBalance(): void {
    this.search('/statement?page=0&size=1', { page: 0, size: 1 }).subscribe((result: any) => {
      if (result.success) {
        this.subject.next(result.content.balance);
      }
    });
  }
}
