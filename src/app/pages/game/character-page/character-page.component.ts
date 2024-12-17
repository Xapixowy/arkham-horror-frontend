import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CharacterPageService } from '@Pages/game/character-page/_services/character-page.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { provideIcons } from '@ng-icons/core';
import { tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { GameCharacterFormControls } from '@Enums/form-controls/game-character-form-controls.enum';
import { CHARACTER_PAGE_CONFIG } from '@Pages/game/character-page/_configs/character-page.config';
import { AttributeSliderComponent } from '@Components/attribute-slider/attribute-slider.component';
import { AttributeSliderConfig } from '@Components/attribute-slider/_types/attribute-slider-config.type';

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
  protected readonly GameCharacterFormControls = GameCharacterFormControls;

  protected readonly sanityInputClasses = computed<Record<string, boolean>>(() => ({
    character__status__input__sanity: true,
    'character__status__input__value--low':
      (this.characterPageService.playerStatus.sanity() || 0) < (this.character()?.sanity || 0),
    'character__status__input__value--high':
      (this.characterPageService.playerStatus.sanity() || 0) > (this.character()?.sanity || 0),
  }));

  protected readonly enduranceInputClasses = computed<Record<string, boolean>>(() => ({
    character__status__input__endurance: true,
    'character__status__input__value--low':
      (this.characterPageService.playerStatus.endurance() || 0) < (this.character()?.endurance || 0),
    'character__status__input__value--high':
      (this.characterPageService.playerStatus.endurance() || 0) > (this.character()?.endurance || 0),
  }));

  protected readonly speedSneakAttributeSliderConfig = computed<AttributeSliderConfig>(() => ({
    firstAttribute: {
      label: '_CharacterPage.Speed',
      formControl: this.form.controls[GameCharacterFormControls.ATTRIBUTES_SPEED],
      inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_SPEED}`,
      values: this.character()?.attributes.speed ?? [],
      value: this.player()?.attributes.speed ?? 0,
    },
    secondAttribute: {
      label: '_CharacterPage.Sneak',
      formControl: this.form.controls[GameCharacterFormControls.ATTRIBUTES_SNEAK],
      inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_SNEAK}`,
      values: this.character()?.attributes.sneak ?? [],
      value: this.player()?.attributes.sneak ?? 0,
    },
  }));

  protected readonly prowessWillAttributeSliderConfig = computed<AttributeSliderConfig>(() => ({
    firstAttribute: {
      label: '_CharacterPage.Prowess',
      formControl: this.form.controls[GameCharacterFormControls.ATTRIBUTES_PROWESS],
      inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_PROWESS}`,
      values: this.character()?.attributes.prowess ?? [],
      value: this.player()?.attributes.prowess ?? 0,
    },
    secondAttribute: {
      label: '_CharacterPage.Will',
      formControl: this.form.controls[GameCharacterFormControls.ATTRIBUTES_WILL],
      inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_WILL}`,
      values: this.character()?.attributes.will ?? [],
      value: this.player()?.attributes.will ?? 0,
    },
  }));

  protected readonly knowledgeLuckAttributeSliderConfig = computed<AttributeSliderConfig>(() => ({
    firstAttribute: {
      label: '_CharacterPage.Knowledge',
      formControl: this.form.controls[GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE],
      inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE}`,
      values: this.character()?.attributes.knowledge ?? [],
      value: this.player()?.attributes.knowledge ?? 0,
    },
    secondAttribute: {
      label: '_CharacterPage.Luck',
      formControl: this.form.controls[GameCharacterFormControls.ATTRIBUTES_LUCK],
      inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_LUCK}`,
      values: this.character()?.attributes.luck ?? [],
      value: this.player()?.attributes.luck ?? 0,
    },
  }));

  get sanityInputId(): string {
    return `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.SANITY}`;
  }

  get enduranceInputId(): string {
    return `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ENDURANCE}`;
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
}
