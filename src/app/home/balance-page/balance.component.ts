import { Component, OnInit } from '@angular/core';
import { Page, View } from 'tns-core-modules/ui/page/page';
import { Transaction } from '~/app/models/transaction';
import { TransactionService } from '~/app/services/trasaction.service';
import { Observable } from 'rxjs';
import { ListView } from 'tns-core-modules/ui/list-view';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { RouterExtensions } from 'nativescript-angular/router';
import { TransactionStatus } from '~/app/utils/variables';

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

  constructor(
    private page: Page,
    private transactionService: TransactionService,
    private router: RouterExtensions
  ) {}

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

  public getTransactionType(type: string): void {
    const types = {
      Purchase: 'Compra',
      Deposit: 'Depósito',
      Transfer: 'Transferência'
    };

    return types[type];
  }

  public getPaymentType(item: any) {
    const paymentTypes = {
      Prepaid: 'Débito',
      Credit: 'Crédito'
    };
    const type =
      item.status === TransactionStatus.CANCELLED
        ? 'Cancelada'
        : item.status === TransactionStatus.DENIED
        ? 'Negada'
        : paymentTypes[item.planType];

    return type;
  }

  public getTypeCssClass(item: any): string {
    const className =
      item.status === TransactionStatus.CANCELLED
        ? 'text-success text-bold'
        : item.type === 'Purchase'
        ? 'text-danger text-bold'
        : 'text-bold';

    return className;
  }

  public onItemTap(event: any, item: Transaction): void {
    const view: View = event.view;

    view.animate({ scale: { x: 1.1, y: 1.1 }, duration: 100 }).then(() => {
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
