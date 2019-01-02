import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { LoginPageComponent } from './login/login.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './core/http.interceptor';
import { DropDownModule } from 'nativescript-drop-down/angular';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    NativeScriptUIListViewModule,
    DropDownModule
  ],
  declarations: [AppComponent, LoginPageComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
