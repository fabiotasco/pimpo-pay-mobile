import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes, PreloadAllModules } from '@angular/router';
import { LoginPageComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginPageComponent},
  { path: 'home', loadChildren: './app/home/home.module#HomeModule' }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
