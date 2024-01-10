import { Component, OnInit } from '@angular/core';
import { AlertTooltipService } from '../alert-tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  constructor(private alertTooltipService: AlertTooltipService) {}

  ngOnInit(): void {
  }

  close(): void {
  }


}
