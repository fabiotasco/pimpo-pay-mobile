import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.css'],
  moduleId: module.id
})
export class DetailTransactionComponent implements OnInit {
  constructor(private page: Page, private activetadRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activetadRoute.queryParams.subscribe(params => {
     
    });
  }
}
