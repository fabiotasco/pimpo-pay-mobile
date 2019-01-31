import { Component, OnInit } from '@angular/core';
import { Page, View } from 'tns-core-modules/ui/page/page';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '~/app/models/transaction';
import { TransactionStatus } from '~/app/utils/variables';
import { RouterExtensions } from 'nativescript-angular/router';

import { TransactionService } from '~/app/services/trasaction.service';
import { ConfirmOptions, confirm } from 'tns-core-modules/ui/dialogs/dialogs';
import { ToastHelperService } from '~/app/core/toast-helper.service';

@Component({
  selector: 'ns-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.css'],
  moduleId: module.id
})
export class DetailTransactionComponent implements OnInit {
  transaction: Transaction;
  transactionStatus = TransactionStatus;
  constructor(
    private page: Page,
    private activetadRoute: ActivatedRoute,
    private router: RouterExtensions,
    private trasactionService: TransactionService,
    private toast: ToastHelperService
  ) {}

  ngOnInit() {
    this.activetadRoute.queryParams.subscribe(params => {
      this.transaction = JSON.parse(params['transaction']);
    });
  }

  goBack(): void {
    this.router.back();
  }

  cancelTransaction(event: any): void {
    const btnView: View = this.page.getViewById('btnCancel');
    btnView.animate({ scale: { x: 0.9, y: 0.9 }, duration: 100 }).then(() => {
      btnView.animate({ scale: { x: 1, y: 1 }, duration: 100 });
    });
    const options: ConfirmOptions = {
      cancelButtonText: 'Voltar',
      message: 'Cancelar Transaçao',
      title: 'Transação',
      okButtonText: 'Confirmar',
      cancelable: false
    };

    confirm(options).then(res => {
      if (res) {
        this.trasactionService
          .executeCancel(this.transaction.id)
          .subscribe(res => {
            if (res.success) {
              this.toast.showToast('Transaçao Cancelada');
              this.router.back();
              return;
            }

            this.toast.showToast(
              res.errors[0].code + ' - ' + res.errors[0].message
            );
          });
      }
    });
  }

  getTransactionStatusColor(status: string): string {
    const colors = {
      AUTHORIZED: '#004c99',
      /** Negada */
      DENIED: '#cc0000',

      /** Cancelada */
      CANCELLED: '#cc0000',

      /** Liquidada */
      SETTLED: '#009900',

      /** Disputada */
      DISPUTED: 'DISPUTED',

      /** Disputa respondida */
      DISPUTE_RESPONDED: 'DISPUTE_RESPONDED'
    };

    return colors[status.toLocaleUpperCase()];
  }

  getTransactionName(status: string): string {
    const colors = {
      AUTHORIZED: 'Autorizado',
      /** Negada */
      DENIED: 'Negada',

      /** Cancelada */
      CANCELLED: 'Cancelada',

      /** Liquidada */
      SETTLED: 'Liquidada',

      /** Disputada */
      DISPUTED: 'Disputada',

      /** Disputa respondida */
      DISPUTE_RESPONDED: 'Disputa respondida'
    };

    return colors[status.toUpperCase()];
  }
}
