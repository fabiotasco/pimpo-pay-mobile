import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';

import { HomePageComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { CreditPageComponent } from './credit-page/credit-page.component';
import { BalancePageComponent } from './balance-page/balance.component';
import { TransferPageComponent } from './transfer-page/transfer.component';
import { UserPageComponent } from './user-page/user.component';
import { SharedModule } from '../shared/shared.module';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr, 'pt-BR');
import { registerElement } from 'nativescript-angular/element-registry';
registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab);

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  exports: [],
  declarations: [
    HomePageComponent,
    BuyPageComponent,
    CreditPageComponent,
    BalancePageComponent,
    TransferPageComponent,
    UserPageComponent,
  ],
  providers: [BarcodeScanner, { provide: LOCALE_ID, useValue: 'pt-BR' }],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
