import { Component, Input, OnInit } from '@angular/core';
import { AlertTooltipService } from '../alert-tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() type: string = '';
  @Input() text: string = '';

  public isVisible: boolean = true;

  constructor(
    private alertService: AlertTooltipService,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.closeToogle();
    }, 15000);
  }

  public closeToogle(): void {
    this.isVisible = false;
    this.alertService.removeAlert(this);
  }
}
