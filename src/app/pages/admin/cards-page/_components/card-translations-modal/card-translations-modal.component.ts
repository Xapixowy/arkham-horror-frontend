import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CardsPageService } from '@Pages/admin/cards-page/cards-page.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { provideIcons } from '@ng-icons/core';
import { tablerEdit, tablerTrash } from '@ng-icons/tabler-icons';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Language } from '@Features/language/_enums/language.enum';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { CardTranslation } from '@Models/card-translation.model';
import { StateStatus } from '@Enums/state-status.enum';
import { Button } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { APP_CONFIG } from '@Configs/app.config';
import { DateHumanReadableComponent } from '@Components/date-human-readable/date-human-readable.component';

@Component({
  selector: 'app-card-translations-modal',
  standalone: true,
  imports: [
    DialogModule,
    TranslocoPipe,
    TableModule,
    NoContentComponent,
    ButtonIconOnlyComponent,
    Button,
    OverlayPanelModule,
    DateHumanReadableComponent,
  ],
  providers: [provideIcons({ tablerEdit, tablerTrash })],
  templateUrl: './card-translations-modal.component.html',
  styleUrl: './card-translations-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTranslationsModalComponent {
  private readonly cardsPageService = inject(CardsPageService);

  protected readonly isCardTranslationsModalShown = this.cardsPageService.isCardTranslationsModalShown;
  protected readonly cardTranslations = this.cardsPageService.cardTranslations;
  protected readonly cardTranslationsCardId = this.cardsPageService.cardTranslationsCardId;
  protected readonly Language = Language;

  protected readonly isLoading = computed<boolean>(
    () => this.cardsPageService.cardStatus() === StateStatus.LOADING && this.cardTranslationsCardId() !== null,
  );

  protected readonly availableLanguages = computed<Language[]>(() => {
    const cardTranslationLanguages = this.cardTranslations().map((t) => t.locale);
    const appLanguage = APP_CONFIG.defaultLanguage;
    return APP_CONFIG.availableLanguages.filter((l) => !cardTranslationLanguages.includes(l) && l !== appLanguage);
  });

  onAddCardTranslation(language: Language): void {
    this.cardsPageService.showCardTranslationModal(language);
  }

  onEditInit(cardTranslation: CardTranslation): void {
    this.cardsPageService.showCardTranslationModal(cardTranslation.locale, cardTranslation);
  }

  onDelete(cardTranslation: CardTranslation): void {
    this.cardsPageService.removeCardTranslation(this.cardTranslationsCardId()!, cardTranslation.locale);
  }

  onHide(): void {
    this.cardsPageService.hideCardTranslationsModal();
  }
}
