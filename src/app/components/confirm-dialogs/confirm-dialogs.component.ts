import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerTrash } from '@ng-icons/tabler-icons';
import { TranslocoPipe } from '@jsverse/transloco';
import { tablerExclamationCircleFill } from '@ng-icons/tabler-icons/fill';

@Component({
  selector: 'app-confirm-dialogs',
  standalone: true,
  imports: [ConfirmDialogModule, NgIcon, TranslocoPipe],
  providers: [provideIcons({ tablerTrash, tablerExclamationCircleFill })],
  templateUrl: './confirm-dialogs.component.html',
  styleUrl: './confirm-dialogs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogsComponent {}
