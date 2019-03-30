import { Component, OnInit } from '@angular/core';
import { Page, View, Color } from 'tns-core-modules/ui/page/page';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { AccountService } from '~/app/services/account.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { AndroidData, ShapeEnum } from 'nativescript-ng-shadow';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { Button } from 'tns-core-modules/ui/button';
import { Plan } from '~/app/models/plan';
import { UserData } from '~/app/models/user-data';
import { Purchase } from '~/app/models/purchase';
import * as moment from 'moment';
import { PositionChevron } from '~/app/utils/variables';
import * as storage from 'nativescript-localstorage';
import { ACCESS, AccessType } from '~/app/utils/variables';

@Component({
  moduleId: module.id,
  selector: 'BuyPage',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {
  public btnShadow: AndroidData = {
    elevation: 2,
    bgcolor: '#EC407A',
    shape: ShapeEnum.RECTANGLE,
    cornerRadius: 8
  };
  public menuChevron = 'res://baseline_chevron_left_black_24';
  public actualPosition: PositionChevron;
  public showInstallmentField = false;
  public showQrCodeField = false;
  public showPhoneNumberField = false;
  public showBuyCard = true;
  public showAccountCard = false;
  public showPlanCard = false;

  public selectedValue: number;
  public selectedAccount: string;
  public selectedPlan: Plan;
  public valueOk = false;
  public accountOk = false;
  public planOk = false;

  public useQrCode = false;
  public myHolderNumber: string;
  public destinationHash: string;

  public isLoading = false;
  public transactionFinish = false;
  public transactionSuccess = false;
  public errorMessage: string;
  public transactionName: string;
  public acessType: string;

  constructor(
    private page: Page,
    private barcode: BarcodeScanner,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastHelper: ToastHelperService
  ) {}

  public ngOnInit() {
    this.acessType = storage.getItem(ACCESS);
    this.transactionName =
      this.acessType === AccessType.BUSINESS ? 'Venda' : 'Compra';

    this.accountService.userData$.subscribe((user: UserData) => {
      this.myHolderNumber = user.phones[0].number;
    });
    this.actualPosition = PositionChevron.CLOSE;
    this.selectedPlan = new Plan();
    this.selectedPlan.name = 'Prepaid';
  }

  public scanCode(): void {
    this.readQrCode();
  }

  public finalizeTrasaction(btnId: string): void {
    this.isLoading = true;
    const view: Button = this.page.getViewById(btnId);
    view
      .animate({ backgroundColor: new Color('#ff77a9'), duration: 200 })
      .then(() => {
        view.animate({ backgroundColor: new Color('#ec407a'), duration: 200 });
      });

    let destinationAccount: any = { hash: this.destinationHash };
    if (!this.useQrCode) {
      destinationAccount = { number: this.selectedAccount };
    }

    const purchase: Purchase = {
      amount: this.selectedValue,
      currency: 'BRL',
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      destinationAccount: destinationAccount,
      installments: this.selectedPlan.installments,
      plan: this.selectedPlan.name,
      holderAccount: {
        number: this.myHolderNumber
      }
    };

    this.transactionService.executePurchase(purchase).subscribe(res => {
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
    this.showAccountCard = true;
  }

  public setAccount() {
    if (!this.selectedValue) {
      this.toastHelper.showToast('Informe o valor da compra');
      return;
    }

    if (!this.selectedAccount) {
      this.toastHelper.showToast('Informe a conta destino');
      return;
    }
    debugger;
    if (!this.useQrCode) {
      this.selectedAccount =
        '+55' + this.selectedAccount.replace('-', '').trim();
    }

    this.accountOk = true;
    this.showAccountCard = false;
    this.showPlanCard = true;
  }

  public setPlan(plan: string, installment = 0) {
    this.selectedPlan.name = plan;
    this.selectedPlan.installments = installment;
    this.planOk = true;
    this.showAccountCard = false;
    this.showBuyCard = false;
  }

  public cardClick(id: string): void {
    const view: StackLayout = this.page.getViewById(id);

    this.setCardExibition(view, id);
  }

  public qrCodeClick(event: any, imageViewId: string) {
    const view = event.view.getViewById(imageViewId);
    this.executeAnimation(view);
    this.showQrCodeField = !this.showQrCodeField;
  }

  public phoneFieldClick(event: any, imageViewId: string) {
    const view = event.view.getViewById(imageViewId);
    this.executeAnimation(view);
    this.showPhoneNumberField = !this.showPhoneNumberField;
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

  public reenterAccount(): void {
    this.selectedAccount = null;
    this.showAccountCard = true;
    this.useQrCode = false;
    this.accountOk = false;

    setTimeout(() => {
      const view: StackLayout = this.page.getViewById('accountCard');
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

  private readQrCode() {
    this.barcode
      .scan({
        formats: 'QR_CODE',
        message: 'Para melhorar a iluminação, use as teclas de volume.',
        showFlipCameraButton: false,
        showTorchButton: true,
        resultDisplayDuration: 100,
        openSettingsIfPermissionWasPreviouslyDenied: true
      })
      .then(result => {
        const scannerResult: any = JSON.parse(result.text);

        this.useQrCode = true;
        this.selectedAccount = scannerResult.phone.trim();
        this.destinationHash = scannerResult.hash;
        this.setAccount();
      });
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
          this.showAccountCard = false;
          this.showPlanCard = false;
          this.excuteAnimationOfCards(viewToAnimate);
          if (accountCardView && planCardView) {
            accountCardView.animate({
              backgroundColor: new Color('#5c605c'),
              duration: 100
            });
            planCardView.animate({
              backgroundColor: new Color('#5c605c'),
              duration: 100
            });
          }
        }

        break;
      case 'accountCard':
        if (!this.showAccountCard) {
          this.showAccountCard = !this.showAccountCard;
          this.showBuyCard = false;
          this.showPlanCard = false;
          this.excuteAnimationOfCards(viewToAnimate);
          if (buyCardView && planCardView) {
            buyCardView.animate({
              backgroundColor: new Color('#5c605c'),
              duration: 100
            });
            planCardView.animate({
              backgroundColor: new Color('#5c605c'),
              duration: 100
            });
          }
        }
        break;
      case 'planCard':
        if (!this.showPlanCard) {
          this.showPlanCard = !this.showPlanCard;
          this.showAccountCard = false;
          this.showBuyCard = false;
          this.excuteAnimationOfCards(viewToAnimate);
          if (buyCardView && accountCardView) {
            accountCardView.animate({
              backgroundColor: new Color('#5c605c'),
              duration: 100
            });
            buyCardView.animate({
              backgroundColor: new Color('#5c605c'),
              duration: 100
            });
          }
        }

        break;

      default:
        break;
    }
  }

  private excuteAnimationOfCards(viewToAnimate: View): void {
    viewToAnimate.animate({
      backgroundColor: new Color('#ffffff'),
      duration: 100
    });
  }
}
