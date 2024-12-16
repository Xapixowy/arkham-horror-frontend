import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameSessionJoinForm } from '@Types/forms/game-session-join-form.type';
import { GameSessionJoinFormControls } from '@Enums/form-controls/game-session-join-form-controls.enum';
import { GAME_SESSION_JOIN_FORM_VALIDATORS } from '@Configs/form-validators/game-session-join-form-validators.config';
import { FormValidationService } from '@Services/form-validation.service';
import { Store } from '@ngrx/store';
import { createGameSession, joinGameSession } from '@States/game/game.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageService } from '@Services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  private readonly localStorageService = inject(LocalStorageService);

  readonly isGameSessionTokenInForm = signal<boolean>(false);

  readonly gameSessionJoinForm = this.initializeGameSessionJoinForm();

  constructor() {
    this.listenToLocalStorageGameSessionChanges();
  }

  submitGameSessionJoinForm(): void {
    if (FormValidationService.isFormInvalid(this.gameSessionJoinForm)) {
      return;
    }

    const gameSessionToken = this.gameSessionJoinForm.controls[GameSessionJoinFormControls.TOKEN].value;

    if (gameSessionToken) {
      this.store.dispatch(joinGameSession({ gameSessionToken }));
    }
  }

  createGameSession(): void {
    this.store.dispatch(createGameSession());
  }

  clearGameSession(): void {
    this.localStorageService.gameSession = null;
    this.localStorageService.player = null;
  }

  private initializeGameSessionJoinForm(): FormGroup<GameSessionJoinForm> {
    return new FormGroup<GameSessionJoinForm>({
      [GameSessionJoinFormControls.TOKEN]: new FormControl(null, {
        validators: GAME_SESSION_JOIN_FORM_VALIDATORS[GameSessionJoinFormControls.TOKEN],
      }),
    });
  }

  private listenToLocalStorageGameSessionChanges(): void {
    this.localStorageService.gameSessionSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((gameSession) => {
      const gameSessionFormControl = this.gameSessionJoinForm.controls[GameSessionJoinFormControls.TOKEN];

      if (gameSession) {
        gameSessionFormControl.setValue(gameSession.token);
        this.isGameSessionTokenInForm.set(true);
        gameSessionFormControl.disable();
      } else {
        gameSessionFormControl.setValue(null);
        this.isGameSessionTokenInForm.set(false);
        gameSessionFormControl.enable();
      }
    });
  }
}
