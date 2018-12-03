import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  selector: 'BuyPage',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {
  constructor(private page:Page) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
