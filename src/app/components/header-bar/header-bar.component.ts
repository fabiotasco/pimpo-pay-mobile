import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '~/app/services/trasaction.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'PimpoHeaderBar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
  moduleId: module.id,
})
export class HeaderBarComponent implements OnInit {
  @Input() username:string;
  balance$:Observable<number>;
  hideBalance = false;
  
  constructor(private transactionService:TransactionService) { }

  ngOnInit() {
    this.balance$ = this.transactionService.accountBalance$;
  }

  closeBalance():void{
    this.hideBalance = !this.hideBalance;
  }
}
