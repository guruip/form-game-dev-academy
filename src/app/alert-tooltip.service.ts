import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertTooltipService {
  private alertsSubject = new BehaviorSubject<any[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  addAlert(type: string, text: string) {
    const alert = { type, text };
    this.alertsSubject.next([...this.alertsSubject.value, alert]);
  }

  removeAlert(alert: any) {
    const alerts = this.alertsSubject.value.filter((a) => a !== alert);
    this.alertsSubject.next(alerts);
  }

  
}
