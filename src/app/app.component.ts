import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalEventService } from './services/global-event.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { ToastHelperService } from './core/toast-helper.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'ns-app',
  moduleId: module.id,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private globalEvent: GlobalEventService, private router: RouterExtensions) {}

  ngOnInit(): void {
    this.subscribeEvents();
  }

  private subscribeEvents(): void {
    this.globalEvent.loggedIn.subscribe(() => {
      this.router.navigate(['/home/balance'], { clearHistory: true });
    });

    this.globalEvent.disconneted.subscribe(() => {
      this.router.navigate(['/login'], { clearHistory: true });
    });
  }
}
