import { Component, Input, OnInit } from '@angular/core';
import { AlertTooltipService } from '../alert-tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() type: 'warning' | 'success' | 'fail' = 'warning';
  @Input() message: string = '';

  constructor(private alertTooltipService: AlertTooltipService) {}

  ngOnInit(): void {
    // this.alertTooltipService.addTooltip(this);
  }

  close(): void {
    // this.alertTooltipService.removeTooltip(this);
  }


}
