import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { BottomModule } from '../components/bottom-bar/bottom-bar.module';
import { HeaderBarModule } from '../components/header-bar/header-bar.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { CurrencyMaskPtComponent } from '../components/nativescript-currency-mask/nativescript-currency-mask.component';
import { NativescriptDocumentMaskComponent } from '../components/nativescript-document-mask/nativescript-document-mask.component';
import { FormsModule } from '@angular/forms';
import { PhoneMaskComponent } from '../components/nativescript-phone-mask/nativescript-phone-mask.component';

@NgModule({
  declarations: [
    CurrencyMaskPtComponent,
    NativescriptDocumentMaskComponent,
    PhoneMaskComponent
  ],
  imports: [
    NativeScriptCommonModule,
    BottomModule,
    HeaderBarModule,
    NativeScriptFormsModule,
    NgShadowModule,
    FormsModule
  ],
  exports: [
    NativeScriptCommonModule,
    FormsModule,
    BottomModule,
    HeaderBarModule,
    NativeScriptFormsModule,
    NgShadowModule,
    CurrencyMaskPtComponent,
    NativescriptDocumentMaskComponent,
    PhoneMaskComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
