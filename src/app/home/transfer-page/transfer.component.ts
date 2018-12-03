import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  selector: 'TransferPage',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferPageComponent implements OnInit {
  constructor(private page:Page) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
