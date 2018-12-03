import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalEventService {
  public loggedIn:EventEmitter<any> = new EventEmitter();
  public disconneted: EventEmitter<any> = new EventEmitter();
  constructor() {}
}
