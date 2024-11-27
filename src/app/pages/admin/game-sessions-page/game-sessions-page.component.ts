import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CARDS_PAGE_CONFIG } from '@Pages/admin/cards-page/cards-page.config';
import { Language } from '@Features/language/_enums/language.enum';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { DateHumanReadableComponent } from '@Components/date-human-readable/date-human-readable.component';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-game-sessions-page',
  standalone: true,
  imports: [
    ButtonIconOnlyComponent,
    DateHumanReadableComponent,
    ImgPlaceholderComponent,
    NoContentComponent,
    PrimeTemplate,
    TableModule,
    TranslocoPipe,
  ],
  templateUrl: './game-sessions-page.component.html',
  styleUrl: './game-sessions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionsPageComponent {
  protected readonly CARDS_PAGE_CONFIG = CARDS_PAGE_CONFIG;
  protected readonly Language = Language;
}
