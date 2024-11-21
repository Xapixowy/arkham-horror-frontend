import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { tablerDatabaseOff } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-no-content',
  standalone: true,
  imports: [NgIcon, TranslocoPipe],
  providers: [provideIcons({ tablerDatabaseOff })],
  templateUrl: './no-content.component.html',
  styleUrl: './no-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent {}
