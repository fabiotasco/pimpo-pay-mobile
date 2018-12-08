import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { Purchase } from '~/app/models/purchase';
import { AccountService } from '~/app/services/account.service';
import { TransactionService } from '~/app/services/trasaction.service';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'BuyPage',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {
  hash: string;
  phone: string;
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

  backToScan(): void {
    this.showCheckout = false;
  }

  finalizeBuy(): void {
    if (!this.phone) {
      this.accountService.userData$.subscribe(data => {
        this.phone = data.phones[0].number;
        this.checkoutBuy();
      });
    } else {
      this.checkoutBuy();
    }
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
        console.log(result);
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

  private checkoutBuy() {
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
        this.toastHelper.showToast(res.errors[0].code+' - '+res.errors[0].message);
      }
    });
  }

  private resetData():void{
    this.payValue = null;
    this.phone = null;
    this.hash = null;
  }
}
