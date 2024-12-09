import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent {

}
