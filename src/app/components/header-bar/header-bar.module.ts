import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { HeaderBarComponent } from './header-bar.component';

@NgModule({
  declarations: [HeaderBarComponent],
  exports: [HeaderBarComponent],
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HeaderBarModule {}
