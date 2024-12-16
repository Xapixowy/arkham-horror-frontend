import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CharacterPageService } from '@Pages/game/character-page/_services/character-page.service';
import { Character } from '@Models/character.model';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { provideIcons } from '@ng-icons/core';
import { tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoPipe, ImgPlaceholderComponent, ButtonIconOnlyComponent],
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

  protected readonly character = computed<Character | null>(
    () => this.characterPageService.player()?.character ?? null,
  );

  onSanityDecrease(): void {
    console.log('Decrease');
  }

  onSanityIncrease(): void {
    console.log('Increase');
  }

  onEnduranceDecrease(): void {
    console.log('Decrease');
  }

  onEnduranceIncrease(): void {
    console.log('Increase');
  }
}
