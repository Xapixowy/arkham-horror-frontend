import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Player } from '@Models/player.model';
import { CardModule } from 'primeng/card';
import { Character } from '@Models/character.model';
import { User } from '@Models/user.model';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { Button } from 'primeng/button';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerAdjustmentsAlt,
  tablerBrain,
  tablerChartBar,
  tablerCoin,
  tablerCrown,
  tablerHeart,
  tablerInfoCircle,
  tablerSearch,
} from '@ng-icons/tabler-icons';
import { TooltipModule } from 'primeng/tooltip';
import { PlayerRole } from '@Enums/players/player-role.enum';
import { DateHumanReadableComponent } from '@Components/date-human-readable/date-human-readable.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CardModule,
    TranslocoPipe,
    ImgPlaceholderComponent,
    Button,
    ButtonIconOnlyComponent,
    TooltipModule,
    NgIcon,
    DateHumanReadableComponent,
  ],
  providers: [
    provideIcons({
      tablerChartBar,
      tablerInfoCircle,
      tablerBrain,
      tablerHeart,
      tablerCoin,
      tablerSearch,
      tablerAdjustmentsAlt,
      tablerCrown,
    }),
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  protected readonly PlayerRole = PlayerRole;

  readonly player = input.required<Player>();

  readonly onShowPlayerCharacterDetails = output<Player>();
  readonly onShowPlayerStatistics = output<Player>();

  protected readonly character = computed<Character | null>(() => this.player().character ?? null);
  protected readonly user = computed<User | null>(() => this.player().user ?? null);

  showPlayerCharacterDetails(): void {
    this.onShowPlayerCharacterDetails.emit(this.player());
  }

  showPlayerStatistics(): void {
    this.onShowPlayerStatistics.emit(this.player());
  }
}
