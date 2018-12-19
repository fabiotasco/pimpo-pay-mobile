import { Component, OnInit } from '@angular/core';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { CurrencyPipe } from '@angular/common';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { Deposit } from '~/app/models/deposit';
import moment = require('moment');
import { adjustDecimal } from '~/app/utils/variables';
import { AccountService } from '~/app/services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  moduleId: module.id,
  selector: 'CreditPage',
  templateUrl: './credit-page.component.html',
  providers: [CurrencyPipe]
})
export class CreditPageComponent implements OnInit {
  value: string;
  constructor(
    private cp: CurrencyPipe,
    private toast: ToastHelperService,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  addFunds(): void {
    if (this.value) {
      dialogs.confirm(`Será descontado ${this.cp.transform(this.value, 'BRL', 'symbol')}, de seu saldo atual. Está de acordo?`).then(res => {
        if (res) {
          this.checkout();
        }
      });
    } else {
      this.toast.showToast('Informe o valor que deseja adicionar');
    }
  }

  private checkout(): void {
    const deposit = new Deposit();

    this.accountService.userData$.subscribe(
      data => {
        deposit.amount = adjustDecimal(parseFloat(this.value), 2);
        deposit.date = moment(new Date()).format('Y-M-D H:m:s');
        deposit.holderAccount.number = data.phones[0].number;

        this.finalizeDeposit(deposit);
      },
      err => {
        this.toast.showToast('Não foi possível recuperar o número do usuário');
      }
    );
  }

  private finalizeDeposit(deposit: Deposit): void {
    this.transactionService.executeDeposit(deposit).subscribe(
      res => {
        if (res.success) {
          this.toast.showToast('Depósito realizada!');
          this.value = '';
        } else {
          this.toast.showToast(res.errors[0].code + ' - ' + res.errors[0].message);
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.showToast('Ouve um problema ao tentar realizar o deposito: ' + err.message);
      }
    );
  }
}
