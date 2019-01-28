import { Component, OnInit } from '@angular/core';
import { PositionChevron } from '~/app/utils/variables';
import { View } from 'tns-core-modules/ui/page/page';
import { ShapeEnum, AndroidData } from 'nativescript-ng-shadow';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { DocumentType } from '~/app/components/nativescript-document-mask/nativescript-document-mask.component';
import { Enroll } from '~/app/models/enroll';
import { AccountService } from '~/app/services/account.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  moduleId: module.id
})
export class NewAccountComponent implements OnInit {
  public btnShadow: AndroidData = {
    elevation: 2,
    bgcolor: '#EC407A',
    shape: ShapeEnum.RECTANGLE,
    cornerRadius: 8
  };

  public mobileOperators: Array<string>;
  public selectedOperatorIndex: number;
  public positonChevronOperators: PositionChevron;
  public positonChevronDocument: PositionChevron;
  public showOperatorList = false;
  public showDocument = false;
  public selectDocument = 'SELECIONAR TIPO DOCUMENTO';
  public selectedOperator = 'SELECIONAR OPERADORA';
  public phoneNumber: string;
  public documentNumber: string;
  public password: string;
  public confirmPassword: string;

  public isSubmit = false;
  public isLoading = false;
  public documentType: DocumentType;

  public enrollFormErrors: EnrollErrorForm;

  constructor(
    private toast: ToastHelperService,
    private accountService: AccountService,
    private router: RouterExtensions
  ) {}

  public ngOnInit() {
    this.enrollFormErrors = new EnrollErrorForm();
    this.positonChevronOperators = PositionChevron.CLOSE;
    this.positonChevronDocument = PositionChevron.CLOSE;
    this.mobileOperators = ['Claro', 'Oi', 'Tim', 'Vivo'];
  }

  public doEnroll(): void {
    this.isSubmit = true;
    this.isLoading = true;
    this.validateEnrollForm();

    if (!this.enrollFormErrors.valid) {
      this.isLoading = false;
      return;
    }

    const enroll: Enroll = {
      document: {
        type: this.documentType.toUpperCase(),
        value: this.documentNumber
      },
      password: this.password,
      phone: {
        networkOperator: this.selectedOperator,
        number: '+55' + this.phoneNumber
      }
    };
    this.accountService.saveRegister(enroll).subscribe(res => {
      if (res.success) {
        this.toast.showToast('Conta cadastrada com sucesso');
        this.router.back();
        return;
      }
      this.toast.showToast(res.errors[0].code + '-' + res.errors[0].message);
    });
  }

  public showMobileOperatorList(event: any, viewId: string) {
    const view: View = event.view;
    this.positonChevronOperators = this.executeAnimation(view.getViewById(viewId), this.positonChevronOperators);
    this.showOperatorList = !this.showOperatorList;
  }

  public showDocumentList(event: any, viewId: string) {
    const view: View = event.view;
    this.positonChevronDocument = this.executeAnimation(view.getViewById(viewId), this.positonChevronDocument);
    this.showDocument = !this.showDocument;
  }

  public selectMobileOperator(event: any, selected: string) {
    const view: View = event.view;

    view.animate({ scale: { x: 1.2, y: 1.2 }, duration: 200 }).then(() => {
      view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
      this.selectedOperator = selected;
      this.showOperatorList = false;
      this.enrollFormErrors.operator.valid = true;
    });
  }

  public selectDocumentType(event: any, selected: string) {
    const view: View = event.view;
    this.documentNumber = '';
    view.animate({ scale: { x: 1.2, y: 1.2 }, duration: 200 }).then(() => {
      view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
      this.selectDocument = selected;
      this.showDocument = false;
      this.enrollFormErrors.documentType.valid = true;
      this.documentType = selected.toLocaleLowerCase() === DocumentType.CPF ? DocumentType.CPF : DocumentType.CNPJ;
    });
  }

  private executeAnimation(view: View, actualPosition: PositionChevron): PositionChevron {
    if (actualPosition === PositionChevron.CLOSE) {
      actualPosition = PositionChevron.OPEN;
      view.animate({ rotate: PositionChevron.OPEN, duration: 200 });
    } else if (actualPosition === PositionChevron.OPEN) {
      actualPosition = PositionChevron.CLOSE;
      view.animate({ rotate: PositionChevron.CLOSE, duration: 200 });
    }

    return actualPosition;
  }

  private validateEnrollForm(): void {
    this.enrollFormErrors.valid = true;
    this.enrollFormErrors.documentNumber.valid = true;
    this.enrollFormErrors.confirmPassword.valid = true;
    this.enrollFormErrors.password.valid = true;
    this.enrollFormErrors.phoneNumber.valid = true;

    if (this.selectDocument != 'CPF' && this.selectDocument != 'CNPJ') {
      this.enrollFormErrors.valid = false;
      this.enrollFormErrors.documentType.valid = false;
      this.enrollFormErrors.documentType.error = 'Selecione o tipo do documento';
    }

    if (!this.documentNumber) {
      this.enrollFormErrors.valid = false;
      this.enrollFormErrors.documentNumber.valid = false;
      this.enrollFormErrors.documentNumber.error = 'Digite o numero do documento';
    }

    if (this.mobileOperators.indexOf(this.selectedOperator) < 0) {
      this.enrollFormErrors.valid = false;
      this.enrollFormErrors.operator.valid = false;
      this.enrollFormErrors.documentType.error = 'Selecione a operadora';
    }

    if (!this.phoneNumber) {
      this.enrollFormErrors.valid = false;
      this.enrollFormErrors.phoneNumber.valid = false;
      this.enrollFormErrors.phoneNumber.error = 'Digite o número do telefone';
    }

    if (!this.password) {
      this.enrollFormErrors.valid = false;
      this.enrollFormErrors.password.valid = false;
      this.enrollFormErrors.password.error = 'Digite a senha';
    }

    if (!this.confirmPassword) {
      this.enrollFormErrors.valid = false;
      this.enrollFormErrors.confirmPassword.valid = false;
      this.enrollFormErrors.confirmPassword.error = 'Confirme a senha';
    }

    if (this.password && this.confirmPassword && this.confirmPassword !== this.password) {
      this.enrollFormErrors.valid = false;
      this.enrollFormErrors.confirmPassword.valid = false;
      this.enrollFormErrors.confirmPassword.error = 'Senha não combina com a informada acima.';
      this.toast.showToast('Senha não confere, a confirmação deve ser igual a senha digitada.');
    }
  }
}

class EnrollErrorForm {
  valid: boolean;
  password: ErrorFormType;
  confirmPassword: ErrorFormType;
  documentType: ErrorFormType;
  documentNumber: ErrorFormType;
  operator: ErrorFormType;
  phoneNumber: ErrorFormType;

  constructor() {
    this.password = new ErrorFormType();
    this.confirmPassword = new ErrorFormType();
    this.documentType = new ErrorFormType();
    this.documentNumber = new ErrorFormType();
    this.operator = new ErrorFormType();
    this.phoneNumber = new ErrorFormType();
  }
}

class ErrorFormType {
  valid: boolean;
  error: string;
}
