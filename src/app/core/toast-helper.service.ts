import { Injectable } from '@angular/core';
import { GlobalEventService } from '../services/global-event.service';
import * as Toast from 'nativescript-toast';

@Injectable({ providedIn: 'root' })
export class ToastHelperService {
  constructor(private globalEvent: GlobalEventService) {
  }

  public showToast(msg: string, duration: string = 'long') {
    var toast = Toast.makeText(msg);
    toast.show();
  }
}
