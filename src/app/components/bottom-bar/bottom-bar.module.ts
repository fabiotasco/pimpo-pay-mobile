import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { BottomBarComponent } from './bottom-bar.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
  imports: [NativeScriptCommonModule],
  exports: [BottomBarComponent],
  declarations: [BottomBarComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BottomModule {}
