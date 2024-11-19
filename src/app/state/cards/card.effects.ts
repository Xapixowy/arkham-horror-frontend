import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@State/app.state';
import {CardsService} from '@Services/cards.service';
import {
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  removeCard,
  removeCardFailure,
  removeCardSuccess
} from '@State/cards/card.actions';
import {catchError, map, of, switchMap} from 'rxjs';
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
}
