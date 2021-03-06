import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClientCustom } from '../core/http-client-custom.service';
import { Purchase } from '../models/purchase';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Deposit } from '../models/deposit';
import { Transaction } from '../models/transaction';
import { Transfer } from '../models/transfer';

@Injectable({ providedIn: 'root' })
export class TransactionService extends BaseService {
  private subjectBalance: BehaviorSubject<number> = new BehaviorSubject(0);
  accountBalance$: Observable<number> = this.subjectBalance.asObservable();
  private subjectTransactions: BehaviorSubject<
    Transaction[]
  > = new BehaviorSubject([]);
  transactions$: Observable<
    Transaction[]
  > = this.subjectTransactions.asObservable();

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

  executeTransfer(transfer: Transfer): Observable<any> {
    return this.save('/transfer', transfer).pipe(
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

  executeCancel(idTransacion: number): Observable<any> {
    return this.deactivate('/' + idTransacion + '/cancel');
  }

  getBalance(): Observable<any> {
    return this.search('/statement', { page: 0, size: 10 }).pipe(
      tap(res => {
        if (res.success) {
          this.subjectBalance.next(res.content.balance);
          this.subjectTransactions.next(res.content.transactions);
        }
      })
    );
  }
}
