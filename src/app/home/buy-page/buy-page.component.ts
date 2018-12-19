import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { Purchase } from '~/app/models/purchase';
import { AccountService } from '~/app/services/account.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import * as moment from 'moment';
import { Enroll } from '~/app/models/enroll';
import { UserData } from '~/app/models/user-data';

@Component({
  moduleId: module.id,
  selector: 'BuyPage',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {
  hash: string;
  phone: string;
  establishmentPhone: string;
  showCheckout = false;
  payValue: number;

  constructor(
    private page: Page,
    private barcode: BarcodeScanner,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastHelper: ToastHelperService
  ) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.accountService.userData$.subscribe((data: UserData) => {
      this.phone = data.phones[0].number;
    });
  }

  scanCode(): void {
    this.barcode.hasCameraPermission().then(permission => {
      if (permission) {
        this.readQrCode(permission);
      } else {
        this.requestCamPermission();
      }
    });
  }

  usePhoneNumber(): void {
    // nessa parte é preciso fazer uma pesquisa pelo telefone informado para conseguir o hash da loja.
    this.establishmentPhone = '+55' + this.establishmentPhone.replace(/\D/, '');
    this.hash = '953cbf7548995abbc2dbb261ea926c3afcf74cc656d6887648ef70cdc8110ebe';
    this.showCheckout = true;
  }

  backToScan(): void {
    this.showCheckout = false;
  }

  checkoutBuy() {
    const purchase: Purchase = {
      amount: this.payValue,
      currency: 'BRL',
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      destinationAccount: {
        hash: this.hash
      },
      holderAccount: {
        number: this.phone
      },
      installments: 1,
      plan: 'Prepaid'
    };

    this.transactionService.executePurchase(purchase).subscribe(res => {
      if (res.success) {
        this.showCheckout = false;
        this.toastHelper.showToast('Compra realizada!');
        this.resetData();
      } else {
        this.toastHelper.showToast(res.errors[0].code + ' - ' + res.errors[0].message);
      }
    });
  }

  private readQrCode(permission) {
    this.barcode
      .scan({
        formats: 'QR_CODE',
        resultDisplayDuration: 500,
        message: 'Para melhorar a iluminação, use as teclas de volume.',
        showFlipCameraButton: true,
        showTorchButton: true
      })
      .then(result => {
        if (result) {
          this.hash = result.text;
          this.showCheckout = true;
        }
      });
  }

  private requestCamPermission(): void {
    this.barcode.requestCameraPermission().then(permission => {
      if (permission) {
        this.readQrCode(permission);
      }
    });
  }

  private resetData(): void {
    this.payValue = null;
    this.phone = null;
    this.hash = null;
  }
}
