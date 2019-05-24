import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  $isLoading: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  public show(): void {
    if (!this.loadingSubject.getValue()) {
      this.loadingSubject.next(true);
    }
  }

  public hide(): void {
    if (this.loadingSubject.getValue()) {
      this.loadingSubject.next(false);
    }
  }
}
