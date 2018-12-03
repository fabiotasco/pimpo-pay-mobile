import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { redirectTo } from '../utils/variables';

@Component({
  moduleId: module.id,
  selector: 'HomePage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private page: Page, private routes: RouterExtensions) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  navigateToPage(index: number): void {
    this.routes.navigate([redirectTo(index)],{clearHistory:true});
  }
}
