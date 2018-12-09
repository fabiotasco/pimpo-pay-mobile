import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { BottomModule } from '../components/bottom-bar/bottom-bar.module';
import { HeaderBarModule } from '../components/header-bar/header-bar.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
  declarations: [],
  imports: [NativeScriptCommonModule, BottomModule, HeaderBarModule,NativeScriptFormsModule],
  exports: [NativeScriptCommonModule, BottomModule, HeaderBarModule,NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
