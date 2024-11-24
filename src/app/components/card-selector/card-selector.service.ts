import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { CharacterCard } from '@Models/character-card.model';
import { Store } from '@ngrx/store';
import { selectCards } from '@State/cards/card.selectors';
import { loadCards } from '@State/cards/card.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from '@Models/card.model';

@Injectable()
export class CardSelectorService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  private readonly cards$ = this.store.select(selectCards);
  readonly cards = signal<Card[]>([]);

  constructor() {
    this.subscribeForCardsChanges();
    this.store.dispatch(loadCards());
  }

  private subscribeForCardsChanges(): void {
    this.cards$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.cards.set(value));
  }

  static getSelectedCardsIdsArray(characterCards: CharacterCard[]): number[] {
    return characterCards.flatMap((characterCard) =>
      characterCard.card ? Array(characterCard.quantity).fill(characterCard.card.id) : [],
    );
  }
}
