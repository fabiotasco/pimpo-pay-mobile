import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'TextFieldDocument',
  templateUrl: './nativescript-document-mask.component.html',
  moduleId: module.id,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NativescriptDocumentMaskComponent),
      multi: true
    }
  ]
})
export class NativescriptDocumentMaskComponent
  implements OnInit, ControlValueAccessor {
  @Input() className: string;
  @Input() type: DocumentType = DocumentType.CPF;
  @Input() returnKeyType = 'next';
  @Input() fieldId = 'default';
  @Input() required = false;
  @Input() name = 'default';
  @Input() fieldHint = 'Conteudo';

  @Output()
  returnPress = new EventEmitter();

  value = '';

  constructor(private page: Page) {}

  ngOnInit(): void {}
  private propagateOnChange: (value: string) => void;

  changeEvent(event: any) {
    let noFormatText: string = '';
    let defaultValue;
    if (event.object.text) {
      defaultValue = event.object.text;
      noFormatText = event.object.text.replace(/\D/g, '');
    }

    if (noFormatText.length <= 11 && this.type !== DocumentType.PHONE) {
      this.type = DocumentType.CPF;
    } else if (
      noFormatText.length > 11 &&
      noFormatText.length <= 15 &&
      this.type !== DocumentType.PHONE
    ) {
      this.type = DocumentType.CNPJ;
    } else if (this.type !== DocumentType.PHONE) {
      return;
    }

    if (this.type === DocumentType.CPF) {
      this.value = this.formatToCpf(noFormatText);
      this.setFocusPositionToFinish();
      this.propagateOnChange(this.value.replace(/\D/g, ''));
    } else if (this.type === DocumentType.CNPJ) {
      this.value = this.formatToCnpj(noFormatText);
      this.setFocusPositionToFinish();
      this.propagateOnChange(this.value.replace(/\D/g, ''));
    } else if (this.type === DocumentType.PHONE) {
      this.value = this.formatToPhone(noFormatText);
      this.setFocusPositionToFinish();
      this.propagateOnChange(this.value.replace(/\D/g, ''));
    }
  }

  writeValue(obj: string): void {
    if (obj) {
      console.log(obj);
      this.value =
        obj.length === 11 ? this.formatToCpf(obj) : this.formatToCnpj(obj);
    }
  }

  returnKeyPress(event: any): void {
    this.returnPress.emit(event);
  }
  registerOnChange(fn: any): void {
    this.propagateOnChange = fn;
  }
  registerOnTouched(fn: any): void {
    // todo
  }
  setDisabledState?(isDisabled: boolean): void {
    // todo
  }

  public getMaxSize(): string {
    const sizes = {
      cpf: 18,
      cnpj: 18,
      phone: 13
    };

    return sizes[this.type.toString()];
  }
  private formatToCpf(v: string): string {
    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    // de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos

    return v;
  }

  private formatToCnpj(v: string): string {
    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
    return v;
  }

  private formatToPhone(v: string): string {
    v = v.replace(/\D/g, '').trim(); // Remove tudo o que não é dígito

    if (v.length <= 7) {
      v = v.replace(/^(\d{2})(\d{1,4})/, '$1 $2'); // Separa o DDD do telefone
    } else if (v.length > 7) {
      v = v.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '$1 $2-$3'); // Separa o DDD e ajusta os digitos do celular
    }

    return v;
  }

  private setFocusPositionToFinish(): void {
    const textField = this.page.getViewById(this.fieldId);
    if (textField && this.page.android) {
      textField.android.setSelection(textField.android.length());
    }
  }
}

export enum DocumentType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
  PHONE = 'phone'
}
