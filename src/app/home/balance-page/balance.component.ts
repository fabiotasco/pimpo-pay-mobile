import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Observable } from 'rxjs';
import { Transaction } from '~/app/models/transaction';
import { TransactionService } from '~/app/services/trasaction.service';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
  moduleId: module.id,
  selector: 'BalancePage',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalancePageComponent implements OnInit {
  transactions$: ObservableArray<Transaction>;

  constructor(private page: Page, private transactionService: TransactionService) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.transactionService.transactions$.subscribe(res => {
      this.transactions$ = new ObservableArray(res);
    });
  }

  onItemLoad($event): void {
    console.log('Item Load', $event.object);
  }
}
