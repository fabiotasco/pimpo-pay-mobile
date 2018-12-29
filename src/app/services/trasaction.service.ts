import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClientCustom } from '../core/http-client-custom.service';
import { Purchase } from '../models/purchase';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Deposit } from '../models/deposit';
import { Transaction } from '../models/transaction';

@Injectable({ providedIn: 'root' })
export class TransactionService extends BaseService {
  private subjectBalance: BehaviorSubject<number> = new BehaviorSubject(0);
  accountBalance$: Observable<number> = this.subjectBalance.asObservable();
  private subjectTransactions: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  transactions$: Observable<Transaction[]> = this.subjectTransactions.asObservable();

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

  executeDeposit(deposit: Deposit): Observable<any> {
    return this.save('/deposit', deposit).pipe(
      tap((res: any) => {
        if (res.success) {
          this.getBalance();
        }
      })
    );
  }

  getBalance(): void {
    this.search('/statement', { page: 0, size: 10}).subscribe((result: any) => {
      if (result.success) {
        this.subjectBalance.next(result.content.balance);
        this.subjectTransactions.next(result.content.transactions);
      }
    });
  }
}
