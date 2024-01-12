import { Injectable } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertTooltipService {
  private alertSubject = new Subject<{ type: string; message: string }>();

  alert$ = this.alertSubject.asObservable();

  show(type: 'warning' | 'success' | 'fail', message: string): void {
    this.alertSubject.next({ type, message });
  }
  
}
