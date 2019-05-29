import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AccountService } from '~/app/services/account.service';
import { UserData } from '~/app/models/user-data';
import { RouterExtensions } from 'nativescript-angular/router';
const ZXing = require('nativescript-zxing');
@Component({
  moduleId: module.id,
  selector: 'UserPage',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserPageComponent implements OnInit {
  image: any;
  userData: UserData;
  constructor(private page: Page, private accountService: AccountService, private router: RouterExtensions) {}

  ngOnInit() {
    this.accountService.userData$.subscribe(res => {
      this.userData = res;
      const userHascode = {
        hash: res.hash,
        phone: res.phones[0].number
      };
      var zx = new ZXing();
      this.image = zx.createBarcode({
        encode: JSON.stringify(userHascode),
        height: 450,
        width: 450,
        format: ZXing.QR_CODE
      });
    });
  }

  logout() {
    this.router.navigate(['login'], { clearHistory: true });
  }
}
