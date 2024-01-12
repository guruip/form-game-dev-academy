import { Component } from '@angular/core';
import { AlertTooltipService } from './alert-tooltip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  alerts$ = this.alertService.alerts$;
  title = 'form-GameDev-Academy';

  constructor(private alertService: AlertTooltipService) {}
}
