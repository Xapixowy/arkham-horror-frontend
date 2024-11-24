import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@State/app.state';
import {CardsService} from '@Services/cards.service';
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
import {catchError, concatMap, map, of, switchMap} from 'rxjs';
import {Card} from '@Models/card.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '@Services/toast.service';
import {ErrorService} from '@Services/error.service';
import {CardTranslation} from '@Models/card-translation.model';
import {CardTranslationsService} from '@Services/card-translations.service';
import {CARD_STATE_CONFIG} from '@State/cards/card.config';

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
      concatMap(({payload, frontImage, backImage}) =>
        this.cardService.addCard(payload).pipe(
          concatMap((cardResponse) =>
            (frontImage
                ? this.cardService.addCardFrontImage(cardResponse.data.id, {file: frontImage})
                : of(cardResponse)
            ).pipe(
              concatMap((frontImageResponse) =>
                (backImage
                    ? this.cardService.addCardBackImage(frontImageResponse.data.id, {file: backImage})
                    : of(frontImageResponse)
                ).pipe(
                  map((backImageResponse) => {
                    this.toastService.success(CARD_STATE_CONFIG.toastTranslationKeys.cards, CARD_STATE_CONFIG.toastTranslationKeys.addCardSuccess);
                    return addCardSuccess({card: Card.fromDto(backImageResponse.data)});
                  }),
                ),
              ),
            ),
          ),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cards, response);
            return of(addCardFailure({error}));
          }),
        ),
      ),
    ),
  );

  updateCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCard),
      concatMap(({cardId, payload, frontImage, backImage}) => this.cardService.updateCard(cardId, payload).pipe(
          concatMap((cardResponse) =>
            (frontImage
                ? this.cardService.addCardFrontImage(cardResponse.data.id, {file: frontImage})
                : this.cardService.removeCardFrontImage(cardResponse.data.id)
            ).pipe(
              concatMap((frontImageResponse) =>
                (backImage
                    ? this.cardService.addCardBackImage(frontImageResponse.data.id, {file: backImage})
                    : this.cardService.removeCardBackImage(frontImageResponse.data.id)
                ).pipe(
                  map((backImageResponse) => {
                    this.toastService.success(CARD_STATE_CONFIG.toastTranslationKeys.cards, CARD_STATE_CONFIG.toastTranslationKeys.updateCardSuccess);
                    return updateCardSuccess({card: Card.fromDto(backImageResponse.data)});
                  }),
                ),
              ),
            ),
          ),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cards, response);
            return of(updateCardFailure({error}));
          }),
        )
      ),
    ),
  );

  removeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCard),
      switchMap(({id}) =>
        this.cardService.removeCard(id).pipe(
          map(() => {
            this.toastService.success(CARD_STATE_CONFIG.toastTranslationKeys.cards, CARD_STATE_CONFIG.toastTranslationKeys.removeCardSuccess);
            return removeCardSuccess({id});
          }),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cards, response);
            return of(removeCardFailure({error}));
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
          map((response) => loadCardsSuccess({cards: response.data.map((card) => Card.fromDto(card))})),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cards, response);
            return of(loadCardsFailure({error}));
          }),
        ),
      ),
    ),
  );

  addCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCardTranslation),
      switchMap(({cardId, payload}) =>
        this.cardTranslationsService.addCardTranslation(cardId, payload).pipe(
          map((response) => {
            this.toastService.success(CARD_STATE_CONFIG.toastTranslationKeys.cardTranslations, CARD_STATE_CONFIG.toastTranslationKeys.addCardTranslationSuccess);
            return addCardTranslationSuccess({
              cardId,
              cardTranslation: CardTranslation.fromDto(response.data),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cardTranslations, response);
            return of(addCardTranslationFailure({error}));
          }),
        ),
      ),
    ),
  );

  updateCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCardTranslation),
      switchMap(({cardId, locale, payload}) => this.cardTranslationsService
        .updateCardTranslation(cardId, locale, payload)
        .pipe(
          map((response) => {
            this.toastService.success(CARD_STATE_CONFIG.toastTranslationKeys.cardTranslations, CARD_STATE_CONFIG.toastTranslationKeys.updateCardTranslationSuccess);
            return updateCardTranslationSuccess({cardId, cardTranslation: CardTranslation.fromDto(response.data)});
          }),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cardTranslations, response);
            return of(updateCardTranslationFailure({error}));
          }),
        )
      ),
    ),
  );

  removeCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCardTranslation),
      switchMap(({cardId, locale}) =>
        this.cardTranslationsService.removeCardTranslation(cardId, locale).pipe(
          map(() => {
            this.toastService.success(CARD_STATE_CONFIG.toastTranslationKeys.cardTranslations, CARD_STATE_CONFIG.toastTranslationKeys.removeCardTranslationSuccess);
            return removeCardTranslationSuccess({cardId, locale});
          }),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cardTranslations, response);
            return of(removeCardTranslationFailure({error}));
          }),
        ),
      ),
    ),
  );

  loadCardTranslations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCardTranslations),
      switchMap(({cardId}) =>
        this.cardTranslationsService.getAllCardTranslations(cardId).pipe(
          map((response) =>
            loadCardTranslationsSuccess({
              cardId,
              cardTranslations: response.data.map((t) => CardTranslation.fromDto(t)),
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CARD_STATE_CONFIG.toastTranslationKeys.cardTranslations, response);
            return of(loadCardTranslationsFailure({error}));
          }),
        ),
      ),
    ),
  );
}
