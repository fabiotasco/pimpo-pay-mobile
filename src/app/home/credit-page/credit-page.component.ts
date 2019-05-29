import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { AccountService } from '~/app/services/account.service';
import { View } from 'tns-core-modules/ui/page/page';
import { UserData } from '~/app/models/user-data';
import * as moment from 'moment';
import { TransactionValue } from '~/app/models/transaction-value';
import { Observable } from 'rxjs';
import { ResumeModel, ResumeActionButton, transactionStatus } from '~/app/utils/variables';
import { TransactionCardService } from '~/app/components/transaction-card/transaction-card.service';
import { LoadingService } from '~/app/services/loading.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Deposit } from '~/app/models/deposit';

@Component({
  moduleId: module.id,
  selector: 'CreditPage',
  templateUrl: './credit-page.component.html',
  styleUrls: ['./credit-page.component.css'],
  providers: [CurrencyPipe]
})
export class CreditPageComponent implements OnInit {
  public transactionValues: TransactionValue;
  public $cardOpened: Observable<string>;
  public actualCardOpened = 'amount';
  public showFinalButton = false;
  public myHolderNumber: string;
  public accountSelected: string;
  public showResume = false;
  public resumeModel: ResumeModel;

  constructor(
    private transactionCardService: TransactionCardService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastHelper: ToastHelperService,
    private loadingService: LoadingService,
    private router: RouterExtensions
  ) {}

  ngOnInit() {
    this.$cardOpened = this.transactionCardService.$partOpen;
    this.accountService.userData$.subscribe((user: UserData) => {
      this.myHolderNumber = user.phones[0].number;
    });
    this.transactionValues = new TransactionValue();
  }

  ngOnDestroy() {
    this.transactionCardService.open('amount');
  }

  public finalizeTrasaction(): void {
    this.transactionCardService.closeAll();

    this.loadingService.show();

    this.transactionService.executeDeposit(this.mountDepositModel()).subscribe(
      res => {
        this.loadingService.hide();
        this.prepareResumeModel(res);
        this.showResume = true;

        if (res.success) {
          this.transactionValues = new TransactionValue();
          this.transactionCardService.open('amount');
          return;
        }
      },
      err => {
        this.loadingService.hide();
        this.toastHelper.showToast(err.errors[0].message);
      }
    );
  }

  public open(part: string): void {
    if (
      (part !== this.actualCardOpened && this.transactionValues[this.actualCardOpened]) ||
      (this.transactionValues[this.actualCardOpened] && this.transactionValues[part])
    ) {
      this.actualCardOpened = part;
      this.transactionCardService.open(part);
    } else if (part !== this.actualCardOpened) {
      this.toastHelper.showToast('Preencha o campo solicitado');
    }

    this.validateData();
  }

  public selectPaymentType(paymentType: any): void {
    this.transactionValues.plan = paymentType.type;
    this.transactionValues.installments = paymentType.installments;

    this.validateData();
  }

  public done(): void {
    this.transactionCardService.closeAll();
  }

  public resumeBtnClicked(btnClicked: string): void {
    if (btnClicked === ResumeActionButton.RETRY) {
      this.showResume = false;
    }

    if (btnClicked === ResumeActionButton.NEW) {
      this.transactionValues = new TransactionValue();
      this.transactionCardService.open('amount');
      this.actualCardOpened = 'amount';
      this.showFinalButton = false;
      this.accountSelected = null;
      this.showResume = false;
    }
  }

  private mountDepositModel(): Deposit {
    const deposit: Deposit = {
      amount: this.transactionValues.amount,
      currency: 'BRL',
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      plan: this.transactionValues.plan,
      holderAccount: {
        number: this.myHolderNumber
      }
    };

    return deposit;
  }

  private validateData(): void {
    if (this.transactionValues.amount && this.transactionValues.plan) {
      this.showFinalButton = true;
    } else {
      this.showFinalButton = false;
    }
  }

  private animationQrButton(view: View): void {
    const state1 = view.createAnimation({
      scale: { x: 1.1, y: 1.1 },
      duration: 100
    });
    const state2 = view.createAnimation({
      scale: { x: 1, y: 1 }
    });

    state1.play().then(() => state2.play());
  }

  private prepareResumeModel(result: any): void {
    const pluralInstallment = this.transactionValues.installments > 1 ? 'Vezes' : 'Vez';
    this.resumeModel = {
      amount: this.transactionValues.amount,
      hasFailure: !result.success,
      status: result.errors ? result.errors[0].message : transactionStatus[result.content.status.toLowerCase()],
      statusCode: result.errors ? result.errors[0].code : null,
      transactionType: 'Depósito',
      plan:
        this.transactionValues.plan === 'Prepaid'
          ? 'Pré-pago'
          : 'Pós-pago ' + this.transactionValues.installments + ' ' + pluralInstallment
    };
  }
}
