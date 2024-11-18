import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TOAST_SERVICE_CONFIG } from '@Configs/toast-service.config';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly translocoService = inject(TranslocoService);
  private readonly messageService = inject(MessageService);

  success(titleKey: string, messageKey: string): void {
    this.messageService.add({
      severity: 'success',
      summary: this.translocoService.translate(titleKey),
      detail: this.translocoService.translate(messageKey),
      life: TOAST_SERVICE_CONFIG.life,
    });
  }

  danger(titleKey: string, messageKey: string): void {
    this.messageService.add({
      severity: 'error',
      summary: this.translocoService.translate(titleKey),
      detail: this.translocoService.translate(messageKey),
      life: TOAST_SERVICE_CONFIG.life,
    });
  }
}
