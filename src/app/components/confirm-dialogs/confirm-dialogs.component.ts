import {Component} from '@angular/core';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {tablerTrash} from '@ng-icons/tabler-icons';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-confirm-dialogs',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    NgIcon,
    TranslocoPipe
  ],
  providers: [
    provideIcons({tablerTrash})
  ],
  templateUrl: './confirm-dialogs.component.html',
  styleUrl: './confirm-dialogs.component.scss'
})
export class ConfirmDialogsComponent {

}
