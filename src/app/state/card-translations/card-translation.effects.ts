import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CardTranslationsService } from '@Services/card-translations.service';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import { inject } from '@angular/core';
import {
  addCardTranslation,
  addCardTranslationFailure,
  addCardTranslationSuccess,
  removeCardTranslation,
  removeCardTranslationFailure,
  removeCardTranslationSuccess,
  updateCardTranslation,
  updateCardTranslationFailure,
  updateCardTranslationSuccess,
} from '@State/card-translations/card-translation.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CardTranslation } from '@Models/card-translation.model';
import { HttpErrorResponse } from '@angular/common/http';

export class CardTranslationEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly cardTranslationsService = inject(CardTranslationsService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  $addCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCardTranslation),
      switchMap(({ cardId, cardTranslation }) =>
        this.cardTranslationsService.addCardTranslation(cardId, { ...cardTranslation }).pipe(
          map((response) => addCardTranslationSuccess({ cardTranslation: CardTranslation.fromDto(response.data) })),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(addCardTranslationFailure({ error }));
          }),
        ),
      ),
    ),
  );

  updateCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCardTranslation),
      switchMap(({ cardId, cardTranslation }) => {
        const cardTranslationWithoutLocale = Object.fromEntries(
          Object.entries(cardTranslation).filter(([key]) => key !== 'locale'),
        ) as Omit<CardTranslation, 'locale'>;

        return this.cardTranslationsService
          .updateCardTranslation(cardId, cardTranslation.locale, { ...cardTranslationWithoutLocale })
          .pipe(
            map((response) =>
              updateCardTranslationSuccess({ cardTranslation: CardTranslation.fromDto(response.data) }),
            ),
            catchError((response: HttpErrorResponse) => {
              const { error } = response.error;
              this.errorService.throwError('_CardsPage.Cards', response);
              return of(updateCardTranslationFailure({ error }));
            }),
          );
      }),
    ),
  );

  removeCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCardTranslation),
      switchMap(({ cardId, locale }) =>
        this.cardTranslationsService.removeCardTranslation(cardId, locale).pipe(
          map(() => removeCardTranslationSuccess({ locale })),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(removeCardTranslationFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
