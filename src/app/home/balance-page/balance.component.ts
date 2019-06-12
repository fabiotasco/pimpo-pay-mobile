import { Component, OnInit } from '@angular/core';
import { Page, View } from 'tns-core-modules/ui/page/page';
import { Transaction } from '~/app/models/transaction';
import { TransactionService } from '~/app/services/trasaction.service';
import { Observable } from 'rxjs';
import { ListView } from 'tns-core-modules/ui/list-view';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'BalancePage',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalancePageComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  accountBalance$: Observable<number>;
  lista: any[] = [];

  constructor(private page: Page, private transactionService: TransactionService, private router: RouterExtensions) {}

  ngOnInit() {
    this.accountBalance$ = this.transactionService.accountBalance$;
    this.transactions$ = this.transactionService.transactions$;
  }

  onItemLoad($event): void {
    const view: ListView = $event.object;
  }

  cancelTransaction(index: number): void {
    dialogs
      .confirm({
        title: 'Cancelar Transação',
        message: 'Deseja realmente cancelar esta transação?',
        okButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      })
      .then(result => {
        if (result) {
          dialogs.alert('Transação foi cancelada e seu saldo atualizado');
        } else {
        }
      });
  }

  getTransactionType(type: string, value: number): void {
    const types = {
      Purchase: 'Compra',
      Deposit: 'Depósito',
      Transfer: value < 0 ? 'TEC Enviada' : 'TEC Recebida'
    };

    return types[type];
  }

  getPaymentType(payment: string) {
    const paymentTypes = {
      Prepaid: 'Débito',
      Credit: 'Crédito'
    };

    return paymentTypes[payment];
  }

  onItemTap(event: any, item: Transaction): void {
    const view: View = event.view;

    view.animate({ scale: { x: 1.05, y: 1.05 }, duration: 100 }).then(() => {
      view.animate({ scale: { x: 1, y: 1 }, duration: 100 });
      const transactionString = JSON.stringify(item);
      this.router.navigate(['detail'], {
        queryParams: {
          transaction: transactionString
        }
      });
    });
  }
}
