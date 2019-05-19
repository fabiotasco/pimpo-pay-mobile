import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ToastHelperService } from '~/app/core/toast-helper.service';
import { AccountService } from '~/app/services/account.service';
import { RouterExtensions } from 'nativescript-angular/router';
import {
  ValueList,
  DropDown,
  SelectedIndexChangedEventData
} from 'nativescript-drop-down';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enroll } from '~/app/models/enroll';
import { LoadingService } from '~/app/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ns-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  moduleId: module.id,
  providers: [LoadingService]
})
export class NewAccountComponent implements OnInit, AfterViewInit {
  public operatorsList: ValueList<string>;
  public documentTypeList: ValueList<string>;
  public confirmPassword: string;
  public enrolForm: FormGroup;

  public isSubmit = false;
  public isLoading = false;
  public passwordMismatch = true;

  $isLoading: Observable<boolean>;
  get fc(): any {
    return this.enrolForm.controls;
  }

  constructor(
    private page: Page,
    private toast: ToastHelperService,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private router: RouterExtensions,
    private fb: FormBuilder
  ) {}

  public ngOnInit() {
    this.$isLoading = this.loadingService.$isLoading;
    this.generateOperatorList();
    this.enrolForm = this.fb.group({
      networkOperator: ['Claro', Validators.required],
      number: ['', Validators.required],
      type: ['CPF', Validators.required],
      value: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngAfterViewInit(): void {
    this.generateOperatorList();
    this.generateDocumentTypeList();
  }

  public doEnroll(): void {
    this.isSubmit = true;

    if (this.enrolForm.invalid || this.passwordMismatch) {
      this.toast.showToast('Dados preenchidos incorretamente.');
      return;
    }

    const enroll = this.mountEnroll(this.enrolForm.value);
    this.loadingService.show();
    this.accountService.saveRegister(enroll).subscribe(
      res => {
        if (res.success) {
          this.loadingService.hide();
          this.toast.showToast('Conta cadastrada com sucesso');
          this.router.back();
          return;
        }
        this.loadingService.hide();
        this.toast.showToast(res.errors[0].message);
      },
      err => {
        this.toast.showToast('Ouve um problema no servidor, tente novamente');
        this.loadingService.hide();
      }
    );
  }

  private mountEnroll(value: any) {
    const enroll: Enroll = {
      document: {
        value: value.value,
        type: value.type
      },
      phone: {
        networkOperator: value.networkOperator,
        number: '+55' + value.number
      },
      password: value.password
    };

    return enroll;
  }

  public selectDocumentType(event: SelectedIndexChangedEventData) {
    this.enrolForm.patchValue({
      type: this.documentTypeList.getValue(event.newIndex)
    });
  }

  public selectNetworkOperator(event: SelectedIndexChangedEventData) {
    this.enrolForm.patchValue({
      networkOperator: this.operatorsList.getValue(event.newIndex)
    });
  }

  public validPassword(value: any): void {
    const confirmation = value.object.text;
    const password = this.enrolForm.controls['password'].value;
    this.passwordMismatch = confirmation !== password;
  }
  private generateOperatorList(): void {
    let dd = this.page.getViewById<DropDown>('operator-list');
    this.operatorsList = new ValueList<string>([
      { value: 'Claro', display: 'Claro' },
      { value: 'Vivo', display: 'Vivo' },
      { value: 'Tim', display: 'Tim' },
      { value: 'Oi', display: 'Oi' },
      { value: 'Nextel', display: 'Nextel' }
    ]);

    dd.items = this.operatorsList;
    dd.selectedIndex = this.operatorsList.getIndex('Claro');
  }

  private generateDocumentTypeList(): void {
    let doc = this.page.getViewById<DropDown>('doctype-list');
    this.documentTypeList = new ValueList<string>([
      { value: 'CPF', display: 'CPF' },
      { value: 'CNPJ', display: 'CNPJ' }
    ]);

    doc.items = this.documentTypeList;
    doc.selectedIndex = this.documentTypeList.getIndex('CPF');
  }
}
