// alert-tooltip.service.ts
import { Injectable, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Injectable({
  providedIn: 'root'
})
export class AlertTooltipService {
  private isVisible: boolean = false;
  private tooltipComponentRef: any;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private createTooltipComponent(): void {
    const tooltipComponent = this.appRef.bootstrap(TooltipComponent, this.injector);
    this.tooltipComponentRef = tooltipComponent.hostView as EmbeddedViewRef<any>;
  }

  private addTooltip(): void {
    if (!this.isVisible) {
      if (!this.tooltipComponentRef) {
        this.createTooltipComponent();
      }

      const tooltipElement = this.tooltipComponentRef.rootNodes[0] as HTMLElement;
      document.body.appendChild(tooltipElement);
      this.isVisible = true;
    }
  }

  private removeTooltip(): void {
    if (this.isVisible && this.tooltipComponentRef) {
      document.body.removeChild(this.tooltipComponentRef.rootNodes[0]);
      this.isVisible = false;
    }
  }

  showFailTooltip(message: string): void {
    this.addTooltip();

    // Устанавливаем таймер для закрытия тултипа
    setTimeout(() => {
      this.removeTooltip();
    }, 15000);
  }
}
