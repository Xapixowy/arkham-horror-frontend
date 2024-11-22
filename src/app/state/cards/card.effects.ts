import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@State/app.state';
import { CardsService } from '@Services/cards.service';
import {
  addCard,
  addCardFailure,
  addCardSuccess,
  addCardTranslation,
  addCardTranslationFailure,
  addCardTranslationSuccess,
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  loadCardTranslations,
  loadCardTranslationsFailure,
  loadCardTranslationsSuccess,
  removeCard,
  removeCardFailure,
  removeCardSuccess,
  removeCardTranslation,
  removeCardTranslationFailure,
  removeCardTranslationSuccess,
  updateCard,
  updateCardFailure,
  updateCardSuccess,
  updateCardTranslation,
  updateCardTranslationFailure,
  updateCardTranslationSuccess,
} from '@State/cards/card.actions';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { Card } from '@Models/card.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import { CardTranslation } from '@Models/card-translation.model';
import { CardTranslationsService } from '@Services/card-translations.service';

@Injectable()
export class CardEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store<AppState>);
  private readonly cardService = inject(CardsService);
  private readonly cardTranslationsService = inject(CardTranslationsService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCard),
      concatMap(({ card, frontImage, backImage }) =>
        this.cardService.addCard({ ...card }).pipe(
          concatMap((cardResponse) =>
            (frontImage
              ? this.cardService.addCardFrontImage(cardResponse.data.id, { file: frontImage })
              : of(cardResponse)
            ).pipe(
              concatMap((frontImageResponse) =>
                (backImage
                  ? this.cardService.addCardBackImage(frontImageResponse.data.id, { file: backImage })
                  : of(frontImageResponse)
                ).pipe(
                  map((backImageResponse) => {
                    this.toastService.success('_CardsPage.Cards', '_CardsPage.Card and images have been added');
                    return addCardSuccess({ card: Card.fromDto(backImageResponse.data) });
                  }),
                ),
              ),
            ),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(addCardFailure({ error }));
          }),
        ),
      ),
    ),
  );

  updateCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCard),
      concatMap(({ card, frontImage, backImage }) => {
        const cardWithoutId = Object.fromEntries(Object.entries(card).filter(([key]) => key !== 'id')) as Omit<
          Card,
          'id'
        >;

        return this.cardService.updateCard(card.id, { ...cardWithoutId }).pipe(
          concatMap((cardResponse) =>
            (frontImage
              ? this.cardService.addCardFrontImage(cardResponse.data.id, { file: frontImage })
              : this.cardService.removeCardFrontImage(cardResponse.data.id)
            ).pipe(
              concatMap((frontImageResponse) =>
                (backImage
                  ? this.cardService.addCardBackImage(frontImageResponse.data.id, { file: backImage })
                  : this.cardService.removeCardBackImage(frontImageResponse.data.id)
                ).pipe(
                  map((backImageResponse) => {
                    this.toastService.success('_CardsPage.Cards', '_CardsPage.Card and images have been updated');
                    return updateCardSuccess({ card: Card.fromDto(backImageResponse.data) });
                  }),
                ),
              ),
            ),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(updateCardFailure({ error }));
          }),
        );
      }),
    ),
  );

  removeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCard),
      switchMap(({ id }) =>
        this.cardService.removeCard(id).pipe(
          map(() => {
            this.toastService.success('_CardsPage.Cards', '_CardsPage.Card has been deleted');
            return removeCardSuccess({ id });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(removeCardFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),
      switchMap(() =>
        this.cardService.getAllCards().pipe(
          map((response) => loadCardsSuccess({ cards: response.data.map((card) => Card.fromDto(card)) })),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(loadCardsFailure({ error }));
          }),
        ),
      ),
    ),
  );

  addCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCardTranslation),
      switchMap(({ cardId, cardTranslation }) =>
        this.cardTranslationsService.addCardTranslation(cardId, { ...cardTranslation }).pipe(
          map((response) => {
            this.toastService.success('_CardsPage.Card translations', '_CardsPage.Card translation has been created');
            return addCardTranslationSuccess({
              cardId,
              cardTranslation: CardTranslation.fromDto(response.data),
            });
          }),
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
          Object.entries(cardTranslation).filter(([key]) => !['locale', 'id'].includes(key)),
        ) as Omit<CardTranslation, 'locale'>;

        return this.cardTranslationsService
          .updateCardTranslation(cardId, cardTranslation.locale, { ...cardTranslationWithoutLocale })
          .pipe(
            map((response) => {
              this.toastService.success('_CardsPage.Card translations', '_CardsPage.Card translation has been updated');
              return updateCardTranslationSuccess({ cardId, cardTranslation: CardTranslation.fromDto(response.data) });
            }),
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
          map(() => {
            this.toastService.success('_CardsPage.Card translations', '_CardsPage.Card translation has been deleted');
            return removeCardTranslationSuccess({ cardId, locale });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(removeCardTranslationFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadCardTranslations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCardTranslations),
      switchMap(({ cardId }) =>
        this.cardTranslationsService.getAllCardTranslation(cardId).pipe(
          map((response) =>
            loadCardTranslationsSuccess({
              cardId,
              cardTranslations: response.data.map((t) => CardTranslation.fromDto(t)),
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError('_CardsPage.Cards', response);
            return of(loadCardTranslationsFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
