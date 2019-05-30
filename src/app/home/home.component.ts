import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { redirectTo } from '../utils/variables';
import { AccountService } from '../services/account.service';
import { UserData } from '../models/user-data';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/trasaction.service';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'HomePage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  actionTitle: string = 'Extrato';
  userData$: Observable<UserData>;
  $isLoading: Observable<boolean>;
  tabSelected = 0;
  constructor(
    private page: Page,
    private routes: RouterExtensions,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private loadingService: LoadingService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.$isLoading = this.loadingService.$isLoading;
    this.userData$ = this.accountService.userData$;

    this.activeRouter.queryParams.subscribe(params => {
      if (params['tab']) {
        const tab = JSON.parse(params['tab']);
        this.navigateToPage(tab);
      } else {
        this.updateBalance();
      }
    });
  }
  navigateToPage(tab: any): void {
    this.actionTitle = tab.tabName;
    this.tabSelected = tab.tabIndex;

    if (tab.tabName === 'Extrato') {
      this.updateBalance();
    }
    this.routes.navigate([redirectTo(tab.tabIndex)], { clearHistory: true });
  }

  private updateBalance(): void {
    this.loadingService.show();
    this.transactionService.getBalance().subscribe(res => {
      this.loadingService.hide();
    });
  }
}
