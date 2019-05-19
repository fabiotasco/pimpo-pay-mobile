import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { TransactionCardService } from '~/app/components/transaction-card/transaction-card.service';
import { Observable } from 'rxjs';
import { TransactionValue } from '~/app/models/transaction-value';
import { LoadingService } from '~/app/services/loading.service';

@Component({
  moduleId: module.id,
  selector: 'BuyPage',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css'],
  providers: [LoadingService]
})
export class BuyPageComponent implements OnInit, OnDestroy {
  public transactionValues: TransactionValue;
  public $cardOpened: Observable<string>;
  public actualCardOpened = 'amount';
  public showFinalButton = false;
  public myHolderNumber: string;
  constructor(
    private page: Page,
    private transactionCardService: TransactionCardService,
    private barcode: BarcodeScanner,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastHelper: ToastHelperService,
    private loadingService: LoadingService
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

  public scanCode(): void {
    this.animationQrButton(this.page.getViewById('qrButton'));
    this.readQrCode();
  }

  public finalizeTrasaction(): void {
    
    const purchase: Purchase = {
      amount: this.transactionValues.amount,
      currency: 'BRL',
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      destinationAccount: {
        hash: this.transactionValues.destinationAccount ||this.transactionValues.destinationHash;
      },
      installments: this.transactionValues.installments,
      plan: this.transactionValues.plan,
      holderAccount: {
        number: this.myHolderNumber
      }
    };

    this.loadingService.show();
    this.transactionService.executePurchase(purchase).subscribe(res => {
      this.loadingService.hide();
      if (!res.success) {
        this.toastHelper.showToast(res.errors[0].message);
      }
    },err =>{
      this.loadingService.hide();
      this.toastHelper.showToast(err.errors[0].message);
    });
  }

  public open(part: string): void {
    if (
      (part !== this.actualCardOpened &&
        this.transactionValues[this.actualCardOpened]) ||
      (this.transactionValues[this.actualCardOpened] &&
        this.transactionValues[part])
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
    if (this.transactionValues.plan === 'Prepaid') {
      this.transactionCardService.closeAll();
    }
    this.validateData();
  }

  public done(): void {
    this.transactionCardService.closeAll();
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
        this.transactionValues.destinationHash = scannerResult.hash;
        this.transactionValues.destinationAccount = scannerResult.phone.trim();
      });
  }

  private validateData(): void {
    if (
      this.transactionValues.amount &&
      this.transactionValues.plan &&
      this.transactionValues.destinationAccount
    ) {
      this.showFinalButton = true;
    } else {
      this.showFinalButton = false;
    }
  }

  private animationQrButton(view: View): void {
    const state1 = view.createAnimation({
      backgroundColor: new Color('#1e98d4'),
      duration: 100
    });
    const state2 = view.createAnimation({
      backgroundColor: new Color('#FFFFFF')
    });

    state1.play().then(() => state2.play());
  }
}
