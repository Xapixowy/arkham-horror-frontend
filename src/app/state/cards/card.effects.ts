import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@State/app.state';
import {CardsService} from '@Services/cards.service';
import {
  addCard,
  addCardFailure,
  addCardSuccess,
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  removeCard,
  removeCardFailure,
  removeCardSuccess
} from '@State/cards/card.actions';
import {catchError, concatMap, map, of, switchMap} from 'rxjs';
import {Card} from '@Models/card.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '@Services/toast.service';
import {ErrorService} from '@Services/error.service';

@Injectable()
export class CardEffects {
  private readonly actions$ = inject(Actions)
  private readonly store = inject(Store<AppState>);
  private readonly cardService = inject(CardsService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  addCard$ = createEffect(() => this.actions$.pipe(
    ofType(addCard),
    concatMap(({card, frontImage, backImage}) =>
      this.cardService.addCard({...card}).pipe(
        concatMap((addCardResponse) =>
          this.cardService.addCardFrontImage(addCardResponse.data.id, {file: frontImage}).pipe(
            concatMap(() =>
              this.cardService.addCardBackImage(addCardResponse.data.id, {file: backImage}).pipe(
                map((addCardBackImageResponse) => {
                  this.toastService.success(
                    '_CardsPage.Cards',
                    '_CardsPage.Card and images added successfully'
                  );
                  return addCardSuccess({card: Card.fromDto(addCardBackImageResponse.data)});
                })
              )
            )
          )
        ),
        catchError((response: HttpErrorResponse) => {
          const {error} = response.error;
          this.errorService.throwError('_CardsPage.Cards', response);
          return of(addCardFailure({error}));
        })
      )
    )
  ))

  removeCard$ = createEffect(() => this.actions$.pipe(
    ofType(removeCard),
    switchMap(({id}) => this.cardService.removeCard(id)
      .pipe(
        map(() => {
          this.toastService.success('_CardsPage.Cards', '_CardsPage.Card deleted successfully');
          return removeCardSuccess({id})
        }),
        catchError((response: HttpErrorResponse) => {
          const {error} = response.error;
          this.errorService.throwError('_CardsPage.Cards', response);
          return of(removeCardFailure({error}))
        })
      )
    )
  ))

  loadCards$ = createEffect(() => this.actions$.pipe(
    ofType(loadCards),
    switchMap(() => this.cardService.getAllCards()
      .pipe(
        map(response => loadCardsSuccess({cards: response.data.map(card => Card.fromDto(card))})),
        catchError((response: HttpErrorResponse) => {
          const {error} = response.error;
          this.errorService.throwError('_CardsPage.Cards', response);
          return of(loadCardsFailure({error}))
        })
      )
    )
  ))
}
