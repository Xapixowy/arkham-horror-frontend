import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CharacterPageService } from '@Pages/game/character-page/_services/character-page.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { AttributeSliderComponent } from '@Components/attribute-slider/attribute-slider.component';
import { WindowEvent } from '@Enums/window-event.enum';
import { PlayerCharacterDetailsModalComponent } from '@Layouts/game-layout/_components/player-character-details-modal/player-character-details-modal.component';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslocoPipe,
    ImgPlaceholderComponent,
    ButtonIconOnlyComponent,
    ReactiveFormsModule,
    NgClass,
    AttributeSliderComponent,
    NgIcon,
    PlayerCharacterDetailsModalComponent,
  ],
  providers: [
    CharacterPageService,
    provideIcons({
      tablerMinus,
      tablerPlus,
    }),
  ],
  templateUrl: './character-page.component.html',
  styleUrl: './character-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPageComponent {
  private readonly characterPageService = inject(CharacterPageService);

  protected readonly form = this.characterPageService.gameCharacterForm;
  protected readonly player = this.characterPageService.player;
  protected readonly character = this.characterPageService.character;
  protected readonly playerStatus = this.characterPageService.playerStatus;
  protected readonly attributeSliderConfigs = this.characterPageService.attributeSliderConfigs;

  protected readonly isCharacterDetailsShown = signal<boolean>(false);

  protected readonly sanityInputClasses = computed<Record<string, boolean>>(() => ({
    'character__status__input__value--low':
      (this.characterPageService.playerStatus.sanity() || 0) < (this.character()?.sanity || 0),
    'character__status__input__value--high':
      (this.characterPageService.playerStatus.sanity() || 0) > (this.character()?.sanity || 0),
  }));

  protected readonly enduranceInputClasses = computed<Record<string, boolean>>(() => ({
    'character__status__input__value--low':
      (this.characterPageService.playerStatus.endurance() || 0) < (this.character()?.endurance || 0),
    'character__status__input__value--high':
      (this.characterPageService.playerStatus.endurance() || 0) > (this.character()?.endurance || 0),
  }));

  constructor() {
    this.listenToWindowEvents();
  }

  onSanityDecrease(): void {
    this.characterPageService.decreaseSanity();
  }

  onSanityIncrease(): void {
    this.characterPageService.increaseSanity();
  }

  onEnduranceDecrease(): void {
    this.characterPageService.decreaseEndurance();
  }

  onEnduranceIncrease(): void {
    this.characterPageService.increaseEndurance();
  }

  onCloseCharacterDetails(): void {
    this.isCharacterDetailsShown.set(false);
  }

  private listenToWindowEvents(): void {
    window.addEventListener(WindowEvent.GAME_CHARACTER_SHOW_DETAILS, () => {
      this.isCharacterDetailsShown.set(true);
    });
  }
}
