import {
  forwardRef,
  OnInit,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  templateUrl: './nativescript-phone-mask.component.html',
  selector: 'TextFieldPhone',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneMaskComponent),
      multi: true
    }
  ]
})
export class PhoneMaskComponent implements OnInit, ControlValueAccessor {
  @Input()
  hint: string;
  @Input()
  className: string = 'input-field';
  @Input()
  returnKeyType: string;
  @Input()
  isEnabled = true;
  @Input() fontSize: number;
  @Input()
  colSpan: string;

  @Input()
  row: string;
  @Input()
  col: string;

  @Output()
  blur = new EventEmitter();

  inputValue: string;
  private fieldValue: TextField;
  private propagateChange = (_: any) => {};

  constructor(private page: Page) {}

  ngOnInit() {
    this.fieldValue = <TextField>this.page.getViewById('fieldValue');
  }

  writeValue(obj: any): void {
    if (obj) {
      this.inputValue = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  changeValue(event: any) {
    if (event.object.text) {
      let v: string = event.object.text;

      v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito

      if (v.length <= 5) {
        v = v.replace(/^(\d{2})(\d{1,3})/, '($1) $2'); // Separa o DDD do telefone
      } else if (v.length > 6 && v.length <= 10) {
        v = v.replace(/(\d{2})(\d{1,4})(\d{1,4})/, '($1) $2-$3'); // Separa o DDD e ajusta os digitos do celular
      } else {
        v = v.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '($1) $2-$3'); // Separa o DDD e ajusta os digitos do celular
      }

      if (v.length === 0) {
        return null;
      }

      this.inputValue = v;
      if (this.page.android) {
        this.fieldValue.android.setSelection(this.fieldValue.android.length());
      }

      const resetedValue = this.prepareToPropagate(v);
      this.propagateChange(resetedValue);
    }
  }

  focusOut(event: any) {
    this.blur.emit(event);
  }

  private prepareToPropagate(value: string): string {
    value = value.replace(/\D/, '').trim();
    value = value.replace(/\D/, '').trim();
    value = value.replace(' ', '').trim();
    value = value.replace('-', '').trim(); // para conter o bug do replace

    return value;
  }
}
