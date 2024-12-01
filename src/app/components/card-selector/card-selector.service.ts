import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {CharacterCard} from '@Models/character-card.model';
import {Store} from '@ngrx/store';
import {selectCards} from '@States/cards/card.selectors';
import {loadCards} from '@States/cards/card.actions';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Card} from '@Models/card.model';
import {PlayerCard} from '@Models/player-card.model';
import {CardSelectorMode} from '@Components/card-selector/_types/card-selector-mode.type';

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

  static getSelectedCardsIdsArray(characterCards: CharacterCard[] | PlayerCard[]): number[] {
    return characterCards.flatMap((characterCard) =>
      characterCard.card ? Array(characterCard.quantity).fill(characterCard.card.id) : [],
    );
  }

  static getNewCards(previous: CharacterCard[] | PlayerCard[], current: CharacterCard[] | PlayerCard[]): CharacterCard[] | PlayerCard[] {
    const previousMap = new Map(previous.map((item) => [item.card!.id, item]));

    return current
      .map((item) => {
        const previousQuantity = previousMap.get(item.card!.id)?.quantity || 0;
        if (item.quantity > previousQuantity) {
          return {
            ...item,
            quantity: item.quantity - previousQuantity,
          } as PlayerCard | CharacterCard;
        }
        return null;
      })
      .filter((item) => item !== null);
  }

  static getRemovedCards(previous: CharacterCard[] | PlayerCard[], current: CharacterCard[] | PlayerCard[]): CharacterCard[] | PlayerCard[] {
    const currentMap = new Map(current.map((item) => [item.card!.id, item]));

    return previous
      .map((item) => {
        const currentQuantity = currentMap.get(item.card!.id)?.quantity || 0;
        if (item.quantity > currentQuantity) {
          return {
            ...item,
            quantity: item.quantity - currentQuantity,
          } as PlayerCard | CharacterCard;
        }
        return null;
      })
      .filter((item) => item !== null);
  }

  static generateSelectedCardObject(mode: CardSelectorMode, id: number, quantity: number, card?: Card): CharacterCard | PlayerCard {
    return mode === 'player' ? new PlayerCard(id, quantity, card) : new CharacterCard(id, quantity, card);
  }
}
