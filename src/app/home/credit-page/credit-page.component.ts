import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { AccountService } from '~/app/services/account.service';
import { View, Page } from 'tns-core-modules/ui/page/page';
import { UserData } from '~/app/models/user-data';
import * as moment from 'moment';
import { TransactionValue } from '~/app/models/transaction-value';
import { Observable } from 'rxjs';
import { ResumeModel, ResumeActionButton, transactionStatus, installmentAmount } from '~/app/utils/variables';
import { TransactionCardService } from '~/app/components/transaction-card/transaction-card.service';
import { LoadingService } from '~/app/services/loading.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Deposit } from '~/app/models/deposit';
import { ValueList, DropDown, SelectedIndexChangedEventData } from 'nativescript-drop-down';

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
  public installmentList: ValueList<number>;
  public dd:DropDown;

  constructor(
    private page:Page,
    private transactionCardService: TransactionCardService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastHelper: ToastHelperService,
    private loadingService: LoadingService,
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

    if (part === "plan" && this.transactionValues.plan === "Credit") {
      this.generateInstallmentList();
      this.transactionValues.installments = this.installmentList.getValue(this.dd.selectedIndex);
    }


    this.validateData();
  }

  public selectPaymentType(paymentType: any): void {
    this.transactionValues.plan = paymentType.type;
    this.transactionValues.installments = paymentType.installments;

    if (paymentType.type === "Credit") {
      this.generateInstallmentList();
      this.transactionValues.installments = this.installmentList.getValue(this.dd.selectedIndex);
    }
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

  public selectInstallment(event: SelectedIndexChangedEventData) {
    this.transactionValues.installments = this.installmentList.getValue(event.newIndex);
    this.validateData();
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
    if(this.transactionValues.plan === 'Credit' && !this.transactionValues.installments){
      this.toastHelper.showToast('Informe a quantidade de parcelas');
      this.showFinalButton = false;
      return;
    }

    if (this.transactionValues.amount && this.transactionValues.plan) {
      this.showFinalButton = true;
    } else {
      this.showFinalButton = false;
    }
  }

  private prepareResumeModel(result: any): void {
    const pluralInstallment = this.transactionValues.installments > 1 ? 'Vezes' : 'Vez';
    this.resumeModel = {
      amount: this.transactionValues.amount,
      hasFailure: !result.success,
      status: result.errors ? result.errors[0].message : transactionStatus[result.content.status.toLowerCase()],
      statusCode: result.errors ? result.errors[0].code : null,
      transactionType: 'Venda',
      plan:
        this.transactionValues.plan === 'Prepaid'
          ? 'À Vista'
          : 'A Prazo ' + this.transactionValues.installments + ' ' + pluralInstallment
    };
  }

  private generateInstallmentList(): void {
    this.dd = this.page.getViewById<DropDown>("installments");

    this.installmentList = new ValueList<number>();
    for (let index = 0; index < installmentAmount; index++) {
      const installment = index + 1;
      this.installmentList.push({ value: installment, display: installment + "" });
    }

    this.dd.items = this.installmentList;
  
  }
}
