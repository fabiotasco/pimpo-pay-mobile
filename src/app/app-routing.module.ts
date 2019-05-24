import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login.component';
import { NewAccountComponent } from './login/new-account/new-account.component';
import { DetailTransactionComponent } from './home/balance-page/detail-transaction/detail-transaction.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'new-account', component: NewAccountComponent },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'detail', component: DetailTransactionComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
