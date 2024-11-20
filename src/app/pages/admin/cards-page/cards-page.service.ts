import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCards} from '@State/cards/card.selectors';
import {Card} from '@Models/card.model';
import {cardInitialState} from '@State/cards/card.reducer';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {loadCards, removeCard} from '@State/cards/card.actions';
import {ConfirmationService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CardsPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly cards$ = this.store.select(selectCards);

  readonly cards = signal<Card[]>(cardInitialState.cards)
  readonly isNewCardModalShown = signal(false)

  constructor() {
    this.subscribeForCardsChanges()
    this.store.dispatch(loadCards());
  }

  removeCard(id: number): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_CardsPage.Delete card',
      message: '_CardsPage.Are you sure you want to delete this card?',
      accept: () => this.store.dispatch(removeCard({id}))
    });
  }

  showNewCardModal(): void {
    this.isNewCardModalShown.set(true);
  }

  private subscribeForCardsChanges(): void {
    this.cards$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => this.cards.set(value));
  }
}
