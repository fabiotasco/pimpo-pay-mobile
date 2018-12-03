import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Credentials } from '../models/credentials';
import { ToastHelperService } from '../core/toast-helper.service';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mobileOperatorList, formatPhoneNumber } from '../utils/variables';
import { Enroll } from '../models/enroll';
@Component({
  moduleId: module.id,
  selector: 'LoginPage',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {
  optionsType: Array<string>;
  operatorlist: Array<string>;
  username: string;
  password: string;
  confirmPassword: string;
  type: string;
  operator: string;
  phoneNumber: string;
  proccessing = false;
  showRegister = false;

  errorMessage: any = {};

  enroll: Enroll;

  constructor(private page: Page, private toastHelper: ToastHelperService, private accountService: AccountService) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.optionsType = ['CPF', 'CNPJ'];
    this.operatorlist = mobileOperatorList().map(item => {
      return item.toLocaleUpperCase();
    });
  }

  submitLogin(): void {
    this.proccessing = true;

    if (this.showRegister) {
      this.register();
    } else {
      this.doLogin();
    }
  }

  showRegisterForm() {
    this.showRegister = true;
  }

  private doLogin() {
    if (this.username && this.password) {
      const credentials: Credentials = {
        username: this.username,
        password: this.password
      };
      this.accountService.login(credentials).subscribe(
        res => {
          this.proccessing = false;
        },
        (err: HttpErrorResponse) => {
          this.proccessing = false;
          this.toastHelper.showToast(err.message);
        }
      );
    } else {
      this.proccessing = false;
      this.toastHelper.showToast('Informe o documento e o password');
    }
  }

  private register() {
    if (this.validateForm()) {
      this.enroll = {
        password: this.password,
        document: {
          value: this.username,
          type: this.optionsType[this.type]
        },
        phone: {
          number: formatPhoneNumber(this.phoneNumber),
          networkOperator: mobileOperatorList()[this.operator + 1]
        }
      };

      this.accountService.saveRegister(this.enroll).subscribe(res => {
        if(res.success){
          this.resetFields();
          this.toastHelper.showToast('Usuário cadastrado');
        }else{
          this.toastHelper.showToast(`${res.errors[0].code} ${res.errors[0].message}`);
          this.proccessing = false;
        }
        
      },err => this.proccessing = false);
    } else {
      this.proccessing = false;
    }
  }

  private validateForm(): boolean {
    let valid = true;
    if (!this.password) {
      valid = false;
      this.errorMessage.password = 'Preencha o password';
    }
    if (this.password) {
      if (this.confirmPassword !== this.password) {
        valid = false;
        this.errorMessage.confirmPassword = 'Informe o mesmo password';
      }
    }

    const type = this.optionsType[this.type];
    if (!type) {
      valid = false;
      this.errorMessage.type = 'Preencha o tipo';
    }

    const operator = this.operatorlist[this.operator];
    if (!operator) {
      valid = false;
      this.errorMessage.operator = 'Preencha a operadora';
    }

    if (!this.username) {
      valid = false;
      this.errorMessage.username = 'Preencha o documento';
    }

    if (!this.phoneNumber) {
      valid = false;
      this.errorMessage.phoneNumber = 'Preencha o telefone';
    }

    if (valid) {
      this.errorMessage = {};
    }

    return valid;
  }

  private resetFields(): void {
    this.phoneNumber = '';
    this.password = '';
    this.operator = '';
    this.type = '';
    this.confirmPassword = '';
    this.proccessing = false;
    this.showRegister = false;
  }
}
