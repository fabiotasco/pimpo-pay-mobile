import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionCardService {
  private partOpenSubject = new BehaviorSubject<string>('amount');
  public $partOpen: Observable<string> = this.partOpenSubject.asObservable();

  constructor() {}

  public open(part: string): void {
    this.partOpenSubject.next(part);
  }

  public closeAll(): void {
    this.partOpenSubject.next(null);
  }
}
