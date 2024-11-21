import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@State/app.state';
import { CardsService } from '@Services/cards.service';
import {
  addCard,
  addCardFailure,
  addCardSuccess,
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  removeCard,
  removeCardFailure,
  removeCardSuccess,
  updateCard,
  updateCardFailure,
  updateCardSuccess,
} from '@State/cards/card.actions';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { Card } from '@Models/card.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';

@Injectable()
export class CardEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store<AppState>);
  private readonly cardService = inject(CardsService);
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
                    this.toastService.success('_CardsPage.Cards', '_CardsPage.Card and images added successfully');
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
            (cardResponse.data.front_image_path && !frontImage
              ? this.cardService.removeCardFrontImage(cardResponse.data.id)
              : this.cardService.addCardFrontImage(cardResponse.data.id, { file: frontImage })
            ).pipe(
              concatMap((frontImageResponse) =>
                (frontImageResponse.data.back_image_path && !backImage
                  ? this.cardService.removeCardBackImage(frontImageResponse.data.id)
                  : this.cardService.addCardBackImage(frontImageResponse.data.id, { file: backImage })
                ).pipe(
                  map((backImageResponse) => {
                    this.toastService.success('_CardsPage.Cards', '_CardsPage.Card and images updated successfully');
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
            this.toastService.success('_CardsPage.Cards', '_CardsPage.Card deleted successfully');
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
}
