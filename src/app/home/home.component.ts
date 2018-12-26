import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { redirectTo } from '../utils/variables';
import { AccountService } from '../services/account.service';
import { UserData } from '../models/user-data';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/trasaction.service';

@Component({
  moduleId: module.id,
  selector: 'HomePage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {

  userData$:Observable<UserData>;

  constructor(private page: Page, private routes: RouterExtensions, private accountService: AccountService,private transactionService:TransactionService) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.userData$ = this.accountService.userData$;
    this.transactionService.getBalance();
  }

  navigateToPage(index: number): void {
    this.routes.navigate([redirectTo(index)], { clearHistory: true });
  }
}