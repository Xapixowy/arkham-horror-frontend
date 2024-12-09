import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { InputOtpChangeEvent, InputOtpModule } from 'primeng/inputotp';
import { LandingPageService } from '@Pages/landing/landing-page/landing-page.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GameSessionJoinFormControls } from '@Enums/form-controls/game-session-join-form-controls.enum';

@Component({
  selector: 'app-game-session-section',
  standalone: true,
  imports: [TranslocoPipe, Button, InputOtpModule, ReactiveFormsModule],
  templateUrl: './game-session-section.component.html',
  styleUrl: './game-session-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionSectionComponent {
  private readonly landingPageService = inject(LandingPageService);

  protected readonly GameSessionJoinFormControls = GameSessionJoinFormControls;
  protected readonly form = this.landingPageService.gameSessionJoinForm;

  onSubmit(): void {
    this.landingPageService.submitGameSessionJoinForm();
  }

  onChange(event: InputOtpChangeEvent): void {
    const value: string = event.value;

    this.landingPageService.gameSessionJoinForm.patchValue({
      [this.GameSessionJoinFormControls.TOKEN]: value.toUpperCase(),
    });
  }

  onCreateGameSession(): void {
    this.landingPageService.createGameSession();
  }
}
