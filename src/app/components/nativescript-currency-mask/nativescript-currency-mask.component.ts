import { forwardRef, OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  templateUrl: './nativescript-currency-mask.component.html',
  selector: 'TextFieldCurrency,[TextFieldCurrency]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMaskPtComponent),
      multi: true
    }
  ]
})
export class CurrencyMaskPtComponent implements OnInit, ControlValueAccessor {
  @Input()
  hint: string;
  @Input()
  className: string = 'input-field';
  @Input()
  returnKeyType: string;
  @Input()
  isEnabled = true;

  @Input()
  colSpan: string;

  @Input()
  row: string;
  @Input()
  col: string;

  @Output()
  returnPress = new EventEmitter();

  inputValue: string;
  private fieldValue: TextField;
  private propagateChange = (_: any) => {};

  constructor(private page: Page) {}

  ngOnInit() {
    this.fieldValue = <TextField>this.page.getViewById('fieldValue');
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  changeValue(event: any) {
    if (event.object.text) {
      let value: string = event.object.text;

      value = value.replace(/\D/g, '');

      if (value.length === 3) {
        value = value.replace(/(\d{1})(\d{2})/, '$1,$2');
      } else if (value.length === 4) {
        value = value.replace(/(\d{2})(\d{2})/, '$1,$2');
      } else if (value.length === 5) {
        value = value.replace(/(\d{3})(\d{2})/, '$1,$2');
      } else if (value.length === 6) {
        value = value.replace(/(\d{1})(\d{3})(\d{2})/, '$1.$2,$3');
      } else if (value.length === 7) {
        value = value.replace(/(\d{2})(\d{3})(\d{2})/, '$1.$2,$3');
      } else if (value.length === 8) {
        value = value.replace(/(\d{3})(\d{3})(\d{2})/, '$1.$2,$3');
      } else if (value.length === 9) {
        value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
      } else if (value.length === 10) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
      } else if (value.length === 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
      } else if (value.length === 12) {
        value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4,$5');
      } else {
        value = value.replace(/(\d{10,})(\d{2})/, '$1.$2');
      }

      this.inputValue = value;
      if (this.page.android) {
        this.fieldValue.android.setSelection(this.fieldValue.android.length());
      }

      const resetedValue = this.prepareToPropagate(value);
      this.propagateChange(resetedValue);
    } else {
     /*  this.propagateChange(''); */
    }
  }

  focusOut(event: any) {
    this.returnPress.emit(event);
  }

  private prepareToPropagate(value: string): string {
    if (value) {
      value = value.replace(/\D/g, '');
      const integerPart = value.slice(0, value.length - 2);
      const decimalPart = value.slice(value.length - 2);
      return parseFloat(integerPart + '.' + decimalPart).toFixed(2);
    }

    return undefined;
  }
}
