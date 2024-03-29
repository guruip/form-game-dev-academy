import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertTooltipService implements OnInit {
  private alertsSubject = new BehaviorSubject<any[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  public addAlert(type: string, text: string): void {
    const alert = { type, text };

    const currentAlerts = this.alertsSubject.value;

    if (currentAlerts.length >= 3) {
      currentAlerts.shift();
    } 
    this.alertsSubject.next([...currentAlerts, alert]);
  }

  public removeAlert(alert: any): void {
    const alerts = this.alertsSubject.value.filter((a) => a !== alert);
    this.alertsSubject.next(alerts);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.removeAlert(this.alertsSubject);
    }, 15000);
  }

}
