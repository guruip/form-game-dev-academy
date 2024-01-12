import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertTooltipService } from '../alert-tooltip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userData: any;
  public inputMessage: string = '';

  constructor(
    private authService: AuthService,
    private alertTooltipService: AlertTooltipService,
  ) { }

  public error(): void  {
    this.showAlert('fail', 'Сообщений об ошибке');
  };

  public warning(): void  {
    this.showAlert('warning', 'Предупредительное сообщение');
  };

  public success(): void  {
    this.showAlert('success', 'Cообщение об успехе');
  }

  public message(): void  {
    this.showAlert('warning', this.inputMessage);
  }

  public showAlert(type: string, text: string): void  {
    this.alertTooltipService.addAlert(type, text);
  };

  public ngOnInit(): void {
    this.userData = this.authService.getLoginResponse();
  };

}
