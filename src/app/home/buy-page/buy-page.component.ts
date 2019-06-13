import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page, View } from 'tns-core-modules/ui/page/page';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { AccountService } from '~/app/services/account.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { UserData } from '~/app/models/user-data';
import { Purchase } from '~/app/models/purchase';
import * as moment from 'moment';
import * as _ from 'lodash';
import { TransactionCardService } from '~/app/components/transaction-card/transaction-card.service';
import { Observable } from 'rxjs';
import { TransactionValue } from '~/app/models/transaction-value';
import { LoadingService } from '~/app/services/loading.service';
import { ResumeModel, ResumeActionButton, transactionStatus } from '~/app/utils/variables';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'BuyPage',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit, OnDestroy {
  public transactionValues: TransactionValue;
  public $cardOpened: Observable<string>;
  public actualCardOpened = 'amount';
  public showFinalButton = false;
  public myHolderNumber: string;
  public accountSelected: string;
  public showResume = false;
  public resumeModel: ResumeModel;
  constructor(
    private page: Page,
    private transactionCardService: TransactionCardService,
    private barcode: BarcodeScanner,
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

  public scanCode(): void {
    this.animationQrButton(this.page.getViewById('qrButton'));
    this.readQrCode();
  }

  public finalizeTrasaction(): void {
    this.loadingService.show();

    this.transactionService.executePurchase(this.mountPurchaseModel()).subscribe(
      res => {
        this.loadingService.hide();

        this.prepareResumeModel(res);
        this.showResume = true;
        this.transactionCardService.open('amount');
        return;
      },
      err => {
        this.loadingService.hide();
        this.toastHelper.showToast(err.error);
      }
    );
  }

  public open(part: string): void {
    if (this.actualCardOpened === 'destinationAccount' && !this.phoneValid(this.transactionValues.destinationAccount)) {
      return;
    } else if (this.actualCardOpened === 'destinationAccount' && !this.transactionValues.destinationHash) {
      this.accountSelected = '+55' + this.transactionValues.destinationAccount;
    }

    if (
      (part !== this.actualCardOpened && this.transactionValues[this.actualCardOpened]) ||
      (this.transactionValues[this.actualCardOpened] && this.transactionValues[part])
    ) {
      this.actualCardOpened = part;
      this.transactionCardService.open(part);
    } else if (this.actualCardOpened === 'destinationAccount' && this.accountSelected) {
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

  public changeAccountValue(event: any): void {
    if (this.resumeModel) {
      setTimeout(() => {
        this.resumeModel = null;
      }, 200);
    } else {
      this.transactionValues.destinationHash = null;
      this.accountSelected = null;
    }
  }

  public done(): void {
    this.transactionCardService.closeAll();
  }

  public resumeBtnClicked(btnClicked: string): void {
    this.showResume = false;
    this.actualCardOpened = 'amount';

    if (btnClicked === ResumeActionButton.NEW) {
      this.transactionValues = new TransactionValue();
      this.showFinalButton = false;
      this.accountSelected = null;
    }
  }

  private mountPurchaseModel(): Purchase {
    const purchase: Purchase = {
      amount: this.transactionValues.amount,
      currency: 'BRL',
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      destinationAccount: this.transactionValues.destinationHash
        ? { hash: this.transactionValues.destinationHash }
        : { number: this.accountSelected },
      installments: this.transactionValues.installments,
      plan: this.transactionValues.plan,
      holderAccount: {
        number: this.myHolderNumber
      }
    };

    return purchase;
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
        setTimeout(() => {
          const scannerResult: any = JSON.parse(result.text);
          this.transactionValues.destinationHash = scannerResult.hash;
          this.accountSelected = scannerResult.phone.trim();
          this.open('plan');
        }, 200);
      })
      .catch(err => {
        this.toastHelper.showToast('Ação cancelada pelo usuário');
      });
  }

  private validateData(): void {
    if (this.transactionValues.amount && this.transactionValues.plan && this.accountSelected) {
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
      destinyAccount: this.accountSelected,
      hasFailure: !result.success,
      status: result.errors ? result.errors[0].message : transactionStatus[result.content.status.toLowerCase()],
      statusCode: result.errors ? result.errors[0].code : null,
      transactionType: 'Compra',
      plan:
        this.transactionValues.plan === 'Prepaid'
          ? 'Pré-pago'
          : 'Pós-pago ' + this.transactionValues.installments + ' ' + pluralInstallment
    };
  }

  private phoneValid(phone: string): boolean {
    if (!phone) {
      this.toastHelper.showToast('Preencha o número de telefone');
      return false;
    }
    if (phone.length < 11) {
      this.toastHelper.showToast('Número de telefone inválido');
      return false;
    }

    return true;
  }
}
