import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionCardComponent } from './action-card.component';
import { ActionCardService } from './action-card.service';
import { NativescriptMaskModule } from '../nativescript-currency-mask/nativescript-mask.module';

@NgModule({
  imports: [NativescriptMaskModule],
  exports: [ActionCardComponent],
  declarations: [ActionCardComponent],
  providers: [ActionCardService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ActionCardModule {}
