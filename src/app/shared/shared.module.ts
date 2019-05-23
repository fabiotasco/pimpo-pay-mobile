import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { BottomModule } from '../components/bottom-bar/bottom-bar.module';
import { HeaderBarModule } from '../components/header-bar/header-bar.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { CurrencyMaskPtComponent } from '../components/nativescript-currency-mask/nativescript-currency-mask.component';
import { NativescriptDocumentMaskComponent } from '../components/nativescript-document-mask/nativescript-document-mask.component';
import { FormsModule } from '@angular/forms';
import { NativescriptMaskModule } from '../components/nativescript-currency-mask/nativescript-mask.module';
import { NativescriptDocumentMaskModule } from '../components/nativescript-document-mask/nativescript-document-mask.module';
import { LoadingComponent } from '../components/loading/loading.component';
import { ResumeComponent } from '../components/resume/resume.component';

@NgModule({
  declarations: [LoadingComponent, ResumeComponent],
  imports: [
    NativeScriptCommonModule,
    BottomModule,
    HeaderBarModule,
    NativeScriptFormsModule,
    NgShadowModule,
    FormsModule,
    NativescriptMaskModule,
    NativescriptDocumentMaskModule
  ],
  exports: [
    NativeScriptCommonModule,
    FormsModule,
    BottomModule,
    HeaderBarModule,
    NativeScriptFormsModule,
    NgShadowModule,
    NativescriptDocumentMaskComponent,
    NativescriptMaskModule,
    LoadingComponent,
    ResumeComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
