import { DestroyRef, inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameSessionJoinForm } from '@Types/forms/game-session-join-form.type';
import { GameSessionJoinFormControls } from '@Enums/form-controls/game-session-join-form-controls.enum';
import { GAME_SESSION_JOIN_FORM_VALIDATORS } from '@Configs/form-validators/game-session-join-form-validators.config';
import { FormValidationService } from '@Services/form-validation.service';
import { GameSessionsService } from '@Services/http/game-sessions.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { createGameSession } from '@States/game/game.actions';
import { selectGameSession } from '@States/game/game.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  private readonly gameSessionsService = inject(GameSessionsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly gameSessionJoinForm = this.initializeGameSessionJoinForm();

  resetGameSessionJoinForm(): void {
    this.gameSessionJoinForm.reset();
    this.gameSessionJoinForm.markAsPristine();
  }

  submitGameSessionJoinForm(): void {
    if (FormValidationService.isFormInvalid(this.gameSessionJoinForm)) {
      return;
    }

    console.log(this.gameSessionJoinForm.value);
    this.resetGameSessionJoinForm();
  }

  createGameSession(): void {
    this.store
      .select(selectGameSession)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (value) =>
          value &&
          this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login]),
      );

    this.store.dispatch(createGameSession());
  }

  private initializeGameSessionJoinForm(): FormGroup<GameSessionJoinForm> {
    return new FormGroup<GameSessionJoinForm>({
      [GameSessionJoinFormControls.TOKEN]: new FormControl(null, {
        validators: GAME_SESSION_JOIN_FORM_VALIDATORS[GameSessionJoinFormControls.TOKEN],
      }),
    });
  }
}
