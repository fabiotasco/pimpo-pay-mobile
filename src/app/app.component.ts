import { Component, OnInit } from '@angular/core';
import { GlobalEventService } from './services/global-event.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { ToastHelperService } from './core/toast-helper.service';

@Component({
  selector: 'ns-app',
  moduleId: module.id,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private globalEvent: GlobalEventService,
    private routes: RouterExtensions,
    private toastHelper: ToastHelperService
  ) {}

  ngOnInit(): void {
    this.subscribeEvents();
  }

  private subscribeEvents(): void {
    this.globalEvent.loggedIn.subscribe(() => {
      this.toastHelper.showToast('Usuário Logado');
      this.routes.navigate(['/home/buy'], { clearHistory: true });
    });

    this.globalEvent.disconneted.subscribe(() => {
      this.routes.navigate(['/login'], { clearHistory: true });
    });
  }
}
