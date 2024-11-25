import {CardState} from '../cards/card.state';
import {StateStatus} from '@Enums/state-status.enum';

export const CARD_STATE_CONFIG: {
  initialState: CardState,
  toastTranslationKeys: {
    cards: string,
    cardTranslations: string,
    addCardSuccess: string,
    updateCardSuccess: string,
    removeCardSuccess: string,
    addCardTranslationSuccess: string,
    updateCardTranslationSuccess: string,
    removeCardTranslationSuccess: string,
  },
} = {
  initialState: {
    cards: [],
    error: null,
    status: StateStatus.PENDING
  },
  toastTranslationKeys: {
    cards: '_CardsPage.Cards',
    cardTranslations: '_CardsPage.Card translations',
    addCardSuccess: '_CardsPage.Card and images have been added',
    updateCardSuccess: '_CardsPage.Card and images have been updated',
    removeCardSuccess: '_CardsPage.Card has been deleted',
    addCardTranslationSuccess: '_CardsPage.Card translation has been created',
    updateCardTranslationSuccess: '_CardsPage.Card translation has been updated',
    removeCardTranslationSuccess: '_CardsPage.Card translation has been deleted',
  },
}
