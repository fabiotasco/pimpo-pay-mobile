import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { HomePageComponent } from './home.component';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { CreditPageComponent } from './credit-page/credit-page.component';
import { BalancePageComponent } from './balance-page/balance.component';
import { TransferPageComponent } from './transfer-page/transfer.component';
import { UserPageComponent } from './user-page/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'buy', component: BuyPageComponent },
      { path: 'credit', component: CreditPageComponent },
      { path: 'balance', component: BalancePageComponent },
      { path: 'transfer', component: TransferPageComponent },
      { path: 'user', component: UserPageComponent }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
  declarations: []
})
export class HomeRoutingModule {}
