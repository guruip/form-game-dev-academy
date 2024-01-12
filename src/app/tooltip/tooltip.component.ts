import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AlertTooltipService } from '../alert-tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() type: string = '';
  @Input() text: string = '';

  isVisible: boolean = true;

  constructor(
    private alertService: AlertTooltipService,
    private el: ElementRef, 
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.closeToogle();
    // }, 15000);
  }

  closeToogle() {
    this.isVisible = false;
    this.alertService.removeAlert(this);
  }
}
