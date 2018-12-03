import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  selector: 'BalancePage',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalancePageComponent implements OnInit {
  constructor(private page:Page) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
