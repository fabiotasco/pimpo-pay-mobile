import { Component, OnInit } from '@angular/core';
import { Page, View } from 'tns-core-modules/ui/page/page';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { AccountService } from '~/app/services/account.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { UserData } from '~/app/models/user-data';
import * as moment from 'moment';
import { ResumeModel, ResumeActionButton, transactionStatus } from '~/app/utils/variables';
import { Transfer } from '~/app/models/transfer';
import { TransactionValue } from '~/app/models/transaction-value';
import { Observable } from 'rxjs';
import { TransactionCardService } from '~/app/components/transaction-card/transaction-card.service';
import { LoadingService } from '~/app/services/loading.service';

@Component({
  moduleId: module.id,
  selector: 'TransferPage',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferPageComponent implements OnInit {
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

  public finalizeTrasaction(): void {
    this.loadingService.show();

    this.transactionService.executeTransfer(this.mountTransferModel()).subscribe(
      res => {
        this.loadingService.hide();
        this.prepareResumeModel(res);
        this.showResume = true;
        this.transactionCardService.open('amount');
        return;
      },
      err => {
        this.loadingService.hide();
        this.toastHelper.showToast(err.errors[0].message);
      }
    );
  }

  public closeAll(): void {
    this.transactionCardService.closeAll();
    this.validateData();
  }

  public done(): void {
    this.transactionCardService.closeAll();
  }

  public resumeBtnClicked(btnClicked: string): void {
    this.actualCardOpened = 'amount';
    this.showResume = false;

    if (btnClicked === ResumeActionButton.NEW) {
      this.transactionValues = new TransactionValue();
      this.showFinalButton = false;
      this.accountSelected = null;
    }
  }

  private mountTransferModel(): Transfer {
    const purchase: Transfer = {
      amount: this.transactionValues.amount,
      currency: 'BRL',
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      destinationAccount: this.transactionValues.destinationHash
        ? { hash: this.transactionValues.destinationHash }
        : { number: this.accountSelected },
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
        const scannerResult: any = JSON.parse(result.text);
        this.transactionValues.destinationHash = scannerResult.hash;
        this.accountSelected = scannerResult.phone.trim();
        this.open(null);
      })
      .catch(err => {
        this.toastHelper.showToast('Ação cancelada pelo usuário');
      });
  }

  private validateData(): void {
    if (this.transactionValues.amount && (this.accountSelected || this.transactionValues.destinationAccount)) {
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
    this.resumeModel = {
      amount: this.transactionValues.amount,
      destinyAccount: this.accountSelected,
      hasFailure: !result.success,
      status: result.errors ? result.errors[0].message : transactionStatus[result.content.status.toLowerCase()],
      statusCode: result.errors ? result.errors[0].code : null,
      transactionType: 'Transferência'
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
