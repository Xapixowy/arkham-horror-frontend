import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormValidationMessageComponent} from '@Components/form-validation-message/form-validation-message.component';
import {TranslocoPipe} from '@jsverse/transloco';
import {PlayerFormControls} from '@Enums/form-controls/player-controls.enum';
import {GameSessionsPageService} from '@Pages/admin/game-sessions-page/game-sessions-page.service';
import {Button} from 'primeng/button';
import {CardSelectorComponent} from '@Components/card-selector/card-selector.component';
import {AttributeSliderComponent} from '@Components/attribute-slider/attribute-slider.component';
import {AttributeSliderConfig} from '@Components/attribute-slider/_types/attribute-slider-config.type';
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'app-player-modal',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputNumberModule,
    FormValidationMessageComponent,
    TranslocoPipe,
    Button,
    CardSelectorComponent,
    AttributeSliderComponent,
    DividerModule
  ],
  templateUrl: './player-modal.component.html',
  styleUrl: './player-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerModalComponent {
  private readonly gameSessionsPageService = inject(GameSessionsPageService);

  protected readonly PlayerFormControls = PlayerFormControls;
  protected readonly isPlayerModalShown = this.gameSessionsPageService.isPlayerModalShown;
  protected readonly form = this.gameSessionsPageService.playerForm;
  protected readonly player = this.gameSessionsPageService.player;
  protected readonly playerCards = this.gameSessionsPageService.playerCards;

  protected readonly speedSneakSliderConfig = computed<AttributeSliderConfig>(() => ({
      firstAttribute: {
        label: '_GameSessionsPage.Speed',
        formControl: this.form.get(PlayerFormControls.ATTRIBUTES_SPEED) as AbstractControl,
        inputId: 'player-modal-' + PlayerFormControls.ATTRIBUTES_SPEED,
        values: this.player()?.character?.attributes.speed ?? [],
        value: this.player()?.attributes?.speed ?? 0
      },
      secondAttribute: {
        label: '_GameSessionsPage.Sneak',
        formControl: this.form.get(PlayerFormControls.ATTRIBUTES_SNEAK) as AbstractControl,
        inputId: 'player-modal-' + PlayerFormControls.ATTRIBUTES_SNEAK,
        values: this.player()?.character?.attributes.sneak ?? [],
        value: this.player()?.attributes?.sneak ?? 0
      }
    })
  );

  protected readonly prowessWillSliderConfig = computed<AttributeSliderConfig>(() => ({
      firstAttribute: {
        label: '_GameSessionsPage.Prowess',
        formControl: this.form.get(PlayerFormControls.ATTRIBUTES_PROWESS) as AbstractControl,
        inputId: 'player-modal-' + PlayerFormControls.ATTRIBUTES_PROWESS,
        values: this.player()?.character?.attributes.prowess ?? [],
        value: this.player()?.attributes?.prowess ?? 0
      },
      secondAttribute: {
        label: '_GameSessionsPage.Will',
        formControl: this.form.get(PlayerFormControls.ATTRIBUTES_WILL) as AbstractControl,
        inputId: 'player-modal-' + PlayerFormControls.ATTRIBUTES_WILL,
        values: this.player()?.character?.attributes.will ?? [],
        value: this.player()?.attributes?.will ?? 0
      }
    })
  );

  protected readonly knowledgeLuckSliderConfig = computed<AttributeSliderConfig>(() => ({
      firstAttribute: {
        label: '_GameSessionsPage.Knowledge',
        formControl: this.form.get(PlayerFormControls.ATTRIBUTES_KNOWLEDGE) as AbstractControl,
        inputId: 'player-modal-' + PlayerFormControls.ATTRIBUTES_KNOWLEDGE,
        values: this.player()?.character?.attributes.knowledge ?? [],
        value: this.player()?.attributes?.knowledge ?? 0
      },
      secondAttribute: {
        label: '_GameSessionsPage.Luck',
        formControl: this.form.get(PlayerFormControls.ATTRIBUTES_LUCK) as AbstractControl,
        inputId: 'player-modal-' + PlayerFormControls.ATTRIBUTES_LUCK,
        values: this.player()?.character?.attributes.luck ?? [],
        value: this.player()?.attributes?.luck ?? 0
      }
    })
  );

  get statusSanity(): AbstractControl {
    return this.form.get(PlayerFormControls.STATUS_SANITY) as AbstractControl;
  }

  get statusSanityInputId(): string {
    return 'player-modal-' + PlayerFormControls.STATUS_SANITY;
  }

  get statusEndurance(): AbstractControl {
    return this.form.get(PlayerFormControls.STATUS_ENDURANCE) as AbstractControl;
  }

  get statusEnduranceInputId(): string {
    return 'player-modal-' + PlayerFormControls.STATUS_ENDURANCE;
  }

  get equipmentMoney(): AbstractControl {
    return this.form.get(PlayerFormControls.EQUIPMENT_MONEY) as AbstractControl;
  }

  get equipmentMoneyInputId(): string {
    return 'player-modal-' + PlayerFormControls.EQUIPMENT_MONEY;
  }

  get equipmentClues(): AbstractControl {
    return this.form.get(PlayerFormControls.EQUIPMENT_CLUES) as AbstractControl;
  }

  get equipmentCluesInputId(): string {
    return 'player-modal-' + PlayerFormControls.EQUIPMENT_CLUES;
  }

  onSave(): void {
    this.gameSessionsPageService.submitPlayerForm().then((isSuccess) => isSuccess && this.onCancel());
  }

  onCancel(): void {
    this.gameSessionsPageService.hidePlayerModal();
  }
}
