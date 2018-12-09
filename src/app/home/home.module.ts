import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { HomePageComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { BottomModule } from '../components/bottom-bar/bottom-bar.module';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { CreditPageComponent } from './credit-page/credit-page.component';
import { BalancePageComponent } from './balance-page/balance.component';
import { TransferPageComponent } from './transfer-page/transfer.component';
import { UserPageComponent } from './user-page/user.component';
import { SharedModule } from '../shared/shared.module';
import { BarcodeScanner } from 'nativescript-barcodescanner';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  exports: [],
  declarations: [HomePageComponent, BuyPageComponent, CreditPageComponent, BalancePageComponent, TransferPageComponent, UserPageComponent],
  providers: [BarcodeScanner],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
