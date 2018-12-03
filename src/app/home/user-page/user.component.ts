import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  selector: 'UserPage',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserPageComponent implements OnInit {
  constructor(private page:Page) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
