import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { Deposit } from '~/app/models/deposit';
import { PositionChevron } from '~/app/utils/variables';
import { AccountService } from '~/app/services/account.service';
import { Color } from 'tns-core-modules/color/color';
import { View, Page } from 'tns-core-modules/ui/page/page';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { Plan } from '~/app/models/plan';
import { Button } from 'tns-core-modules/ui/button/button';
import { UserData } from '~/app/models/user-data';
import { ShapeEnum, AndroidData } from 'nativescript-ng-shadow';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'CreditPage',
  templateUrl: './credit-page.component.html',
  styleUrls: ['./credit-page.component.css'],
  providers: [CurrencyPipe]
})
export class CreditPageComponent implements OnInit {
  public btnShadow: AndroidData = {
    elevation: 2,
    bgcolor: '#EC407A',
    shape: ShapeEnum.RECTANGLE,
    cornerRadius: 8
  };
  public menuChevron = 'res://baseline_chevron_left_black_24';
  public actualPosition: PositionChevron;
  public showInstallmentField = false;
  public showBuyCard = true;
  public showPlanCard = false;

  public selectedValue: number;
  public selectedPlan: Plan;
  public valueOk = false;
  public planOk = false;

  public myHolderNumber: string;

  public isLoading = false;
  public transactionFinish = false;
  public transactionSuccess = false;
  public errorMessage: string;
  public deposit: Deposit;

  constructor(
    private page: Page,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastHelper: ToastHelperService
  ) {}

  public ngOnInit() {
    this.deposit = new Deposit();
    this.accountService.userData$.subscribe((user: UserData) => {
      this.myHolderNumber = user.phones[0].number;
    });
    this.actualPosition = PositionChevron.CLOSE;
    this.selectedPlan = new Plan();
    this.selectedPlan.name = 'Prepaid';
  }

  public finalizeTrasaction(btnId: string): void {
    this.isLoading = true;
    const view: Button = this.page.getViewById(btnId);
    view.animate({ backgroundColor: new Color('#ff77a9'), duration: 200 }).then(() => {
      view.animate({ backgroundColor: new Color('#ec407a'), duration: 200 });
    });

    this.deposit.amount = this.selectedValue;
    this.deposit.currency = 'BRL';
    this.deposit.date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.deposit.holderAccount.number = this.myHolderNumber;

    this.transactionService.executeDeposit(this.deposit).subscribe(res => {
      this.isLoading = false;
      this.transactionFinish = true;
      this.transactionSuccess = res.success;
      if (!this.transactionSuccess) {
        this.errorMessage = res.errors[0].message;
      }
    });
  }

  public newTransaction(): void {
    this.transactionFinish = false;
  }

  public setValue() {
    if (!this.selectedValue) {
      this.toastHelper.showToast('Informe o valor da compra');
      return;
    }
    this.valueOk = true;
    this.showBuyCard = false;
    this.showPlanCard = true;
  }

  public setPlan(plan: string, installment = 0) {
    this.selectedPlan.name = plan;
    this.selectedPlan.installments = installment;
    this.planOk = true;
    this.showBuyCard = false;
  }

  public cardClick(id: string): void {
    const view: StackLayout = this.page.getViewById(id);

    this.setCardExibition(view, id);
  }

  public posPagClick(event: any, imageViewId: string) {
    const view = event.view.getViewById(imageViewId);
    this.executeAnimation(view);
    this.showInstallmentField = !this.showInstallmentField;
  }

  public reenterValue(): void {
    this.selectedValue = null;
    this.showBuyCard = true;
    this.valueOk = false;
    setTimeout(() => {
      const view: StackLayout = this.page.getViewById('buyCard');
      view.style.background = '#ffffff';
    }, 100);
  }

  public reenterPlan(): void {
    this.selectedPlan = new Plan();
    this.showPlanCard = true;
    this.planOk = false;

    setTimeout(() => {
      const view: StackLayout = this.page.getViewById('planCard');
      view.style.background = '#ffffff';
    }, 100);
  }

  private executeAnimation(view: View): void {
    if (this.actualPosition === PositionChevron.CLOSE) {
      this.actualPosition = PositionChevron.OPEN;
      view.animate({ rotate: PositionChevron.OPEN, duration: 200 });
    } else if (this.actualPosition === PositionChevron.OPEN) {
      this.actualPosition = PositionChevron.CLOSE;
      view.animate({ rotate: PositionChevron.CLOSE, duration: 200 });
    }
  }

  private setCardExibition(viewToAnimate, id: string): void {
    const buyCardView: StackLayout = this.page.getViewById('buyCard');
    const accountCardView: StackLayout = this.page.getViewById('accountCard');
    const planCardView: StackLayout = this.page.getViewById('planCard');

    switch (id) {
      case 'buyCard':
        if (!this.showBuyCard) {
          this.showBuyCard = true;
          this.showPlanCard = false;
          this.excuteAnimationOfCards(viewToAnimate);
          if (accountCardView && planCardView) {
            accountCardView.animate({ backgroundColor: new Color('#5c605c'), duration: 100 });
            planCardView.animate({ backgroundColor: new Color('#5c605c'), duration: 100 });
          }
        }

        break;
      case 'planCard':
        if (!this.showPlanCard) {
          this.showPlanCard = !this.showPlanCard;
          this.showBuyCard = false;
          this.excuteAnimationOfCards(viewToAnimate);
          if (buyCardView && accountCardView) {
            accountCardView.animate({ backgroundColor: new Color('#5c605c'), duration: 100 });
            buyCardView.animate({ backgroundColor: new Color('#5c605c'), duration: 100 });
          }
        }

        break;

      default:
        break;
    }
  }

  private excuteAnimationOfCards(viewToAnimate: View): void {
    viewToAnimate.animate({ backgroundColor: new Color('#ffffff'), duration: 100 });
  }
}
