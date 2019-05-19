import { Component, OnInit } from '@angular/core';
import { Page, View } from 'tns-core-modules/ui/page/page';
import { Credentials } from '../models/credentials';
import { ToastHelperService } from '../core/toast-helper.service';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'LoginPage',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoadingService]
})
export class LoginPageComponent implements OnInit {
  username: string /*  = '11564763722' */;
  password: string /* = '123456' */;
  $isLoading: Observable<boolean>;

  constructor(
    private page: Page,
    private toastHelper: ToastHelperService,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.$isLoading = this.loadingService.$isLoading;
    this.page.actionBarHidden = true;
  }

  public showRegisterForm(event: any) {
    const view: View = event.view;
    view.animate({ scale: { x: 1.1, y: 1.1 }, duration: 200 }).then(() => {
      view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
      this.router.navigate(['new-account']);
    });
  }

  public doLogin() {
    if (this.username && this.password) {
      const credentials: Credentials = {
        username: this.username.replace('/D/g', ''),
        password: this.password
      };

      this.loadingService.show();
      this.accountService.login(credentials).subscribe(
        res => {
          this.loadingService.hide();
        },
        (err: HttpErrorResponse) => {
          this.loadingService.hide();
          this.toastHelper.showToast(err.message);
        }
      );
    } else {
      this.toastHelper.showToast('Informe o documento e o password');
    }
  }
}
