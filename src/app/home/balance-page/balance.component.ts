import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Transaction } from '~/app/models/transaction';
import { TransactionService } from '~/app/services/trasaction.service';
import { Observable } from 'rxjs';
import { ListView } from 'ui/list-view';
import * as dialogs from 'tns-core-modules/ui/dialogs';

@Component({
  moduleId: module.id,
  selector: 'BalancePage',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalancePageComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  lista: any[] = [];
  constructor(private page: Page, private transactionService: TransactionService) {}

  ngOnInit() {
    this.lista = [
      { name: 'Maique', description: 'Rosa da silva' },
      { name: 'Maique', description: 'Rosa da silva' },
      { name: 'Maique', description: 'Rosa da silva' },
      { name: 'Maique', description: 'Rosa da silva' }
    ];
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
        cancelButtonText: 'Cancelar',
      })
      .then(result => {
        if (result) {
          dialogs.alert('Transação foi cancelada e seu saldo atualizado');
        } else {
          console.log('Cancelou');
        }
      });
    
  }
}
