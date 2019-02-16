import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes, PreloadAllModules } from '@angular/router';
import { LoginPageComponent } from './login/login.component';
import { NewAccountComponent } from './login/new-account/new-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'new-account', component: NewAccountComponent },
  { path: 'home', loadChildren: './app/home/home.module#HomeModule' }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
