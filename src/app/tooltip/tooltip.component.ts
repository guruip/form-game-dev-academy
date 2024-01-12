import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertTooltipService } from '../alert-tooltip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() type: string = 'warning';
  @Input() message: string = '';
  isVisible: boolean = false;
  private subscription!: Subscription;

  constructor(private alertTooltipService: AlertTooltipService) {}

  ngOnInit(): void {
    this.subscription = this.alertTooltipService.alert$.subscribe(({ type, message }) => {
      this.type = type;
      this.message = message;
      this.show();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  show(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.hide();
    }, 15000);
  }

  hide(): void { 
    this.isVisible = false;
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  close() {
    // this.alertService.clear(this.id);
  }
}
