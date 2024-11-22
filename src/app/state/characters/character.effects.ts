import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@State/app.state';
import {catchError, concatMap, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '@Services/toast.service';
import {ErrorService} from '@Services/error.service';
import {CharactersService} from '@Services/characters.service';
import {CharacterTranslationsService} from '@Services/character-translations.service';
import {
  addCharacter,
  addCharacterFailure,
  addCharacterSuccess,
  addCharacterTranslation,
  addCharacterTranslationFailure,
  addCharacterTranslationSuccess,
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  loadCharacterTranslations,
  loadCharacterTranslationsFailure,
  loadCharacterTranslationsSuccess,
  removeCharacter,
  removeCharacterFailure,
  removeCharacterSuccess,
  removeCharacterTranslation,
  removeCharacterTranslationFailure,
  removeCharacterTranslationSuccess,
  updateCharacter,
  updateCharacterFailure,
  updateCharacterSuccess,
  updateCharacterTranslation,
  updateCharacterTranslationFailure,
  updateCharacterTranslationSuccess
} from '@State/characters/character.actions';
import {Character} from '@Models/character.model';
import {CharacterTranslation} from '@Models/character-translation.model';
import {CHARACTER_STATE_CONFIG} from '@State/characters/character.config';

@Injectable()
export class CharacterEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store<AppState>);
  private readonly characterService = inject(CharactersService)
  private readonly characterTranslationsService = inject(CharacterTranslationsService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  addCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCharacter),
      concatMap(({character, image}) =>
        this.characterService.addCharacter({...character}).pipe(
          concatMap((characterResponse) =>
            (image
                ? this.characterService.addCharacterImage(characterResponse.data.id, {file: image})
                : of(characterResponse)
            ).pipe(
              map((imageResponse) => {
                this.toastService.success(CHARACTER_STATE_CONFIG.toastTranslationKeys.characters, CHARACTER_STATE_CONFIG.toastTranslationKeys.addCharacterSuccess);
                return addCharacterSuccess({character: Character.fromDto(imageResponse.data)});
              }),
            ),
          ),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characters, response);
            return of(addCharacterFailure({error}));
          }),
        ),
      ),
    ),
  );

  updateCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCharacter),
      concatMap(({character, image}) => {
        const characterWithoutId = Object.fromEntries(Object.entries(character).filter(([key]) => key !== 'id')) as Omit<
          Character,
          'id'
        >;

        return this.characterService.updateCharacter(character.id, {...characterWithoutId}).pipe(
          concatMap((cardResponse) =>
            (image
                ? this.characterService.addCharacterImage(cardResponse.data.id, {file: image})
                : this.characterService.removeCharacterImage(cardResponse.data.id)
            ).pipe(
              map((imageResponse) => {
                this.toastService.success(CHARACTER_STATE_CONFIG.toastTranslationKeys.characters, CHARACTER_STATE_CONFIG.toastTranslationKeys.updateCharacterSuccess);
                return updateCharacterSuccess({character: Character.fromDto(imageResponse.data)});
              }),
            ),
          ),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characters, response);
            return of(updateCharacterFailure({error}));
          }),
        );
      }),
    ),
  );

  removeCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCharacter),
      switchMap(({id}) =>
        this.characterService.removeCharacter(id).pipe(
          map(() => {
            this.toastService.success(CHARACTER_STATE_CONFIG.toastTranslationKeys.characters, CHARACTER_STATE_CONFIG.toastTranslationKeys.removeCharacterSuccess);
            return removeCharacterSuccess({id});
          }),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characters, response);
            return of(removeCharacterFailure({error}));
          }),
        ),
      ),
    ),
  );

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      switchMap(() =>
        this.characterService.getAllCharacters().pipe(
          map((response) => loadCharactersSuccess({characters: response.data.map((character) => Character.fromDto(character))})),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characters, response);
            return of(loadCharactersFailure({error}));
          }),
        ),
      ),
    ),
  );

  addCharacterTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCharacterTranslation),
      switchMap(({characterId, characterTranslation}) =>
        this.characterTranslationsService.addCharacterTranslation(characterId, {...characterTranslation}).pipe(
          map((response) => {
            this.toastService.success(CHARACTER_STATE_CONFIG.toastTranslationKeys.characterTranslations, CHARACTER_STATE_CONFIG.toastTranslationKeys.addCharacterTranslationSuccess);
            return addCharacterTranslationSuccess({
              characterId,
              characterTranslation: CharacterTranslation.fromDto(response.data),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characterTranslations, response);
            return of(addCharacterTranslationFailure({error}));
          }),
        ),
      ),
    ),
  );

  updateCharacterTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCharacterTranslation),
      switchMap(({characterId, characterTranslation}) => {
        const characterTranslationWithoutLocale = Object.fromEntries(
          Object.entries(characterTranslation).filter(([key]) => !['locale', 'id'].includes(key)),
        ) as Omit<CharacterTranslation, 'locale' | 'id'>;

        return this.characterTranslationsService
          .updateCharacterTranslation(characterId, characterTranslation.locale, {...characterTranslationWithoutLocale})
          .pipe(
            map((response) => {
              this.toastService.success(CHARACTER_STATE_CONFIG.toastTranslationKeys.characterTranslations, CHARACTER_STATE_CONFIG.toastTranslationKeys.updateCharacterTranslationSuccess);
              return updateCharacterTranslationSuccess({
                characterId,
                characterTranslation: CharacterTranslation.fromDto(response.data)
              });
            }),
            catchError((response: HttpErrorResponse) => {
              const {error} = response.error;
              this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characterTranslations, response);
              return of(updateCharacterTranslationFailure({error}));
            }),
          );
      }),
    ),
  );

  removeCardTranslation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCharacterTranslation),
      switchMap(({characterId, locale}) =>
        this.characterTranslationsService.removeCharacterTranslation(characterId, locale).pipe(
          map(() => {
            this.toastService.success(CHARACTER_STATE_CONFIG.toastTranslationKeys.characterTranslations, CHARACTER_STATE_CONFIG.toastTranslationKeys.removeCharacterTranslationSuccess);
            return removeCharacterTranslationSuccess({characterId, locale});
          }),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characterTranslations, response);
            return of(removeCharacterTranslationFailure({error}));
          }),
        ),
      ),
    ),
  );

  loadCardTranslations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacterTranslations),
      switchMap(({characterId}) =>
        this.characterTranslationsService.getAllCharacterTranslations(characterId).pipe(
          map((response) =>
            loadCharacterTranslationsSuccess({
              characterId,
              characterTranslations: response.data.map((t) => CharacterTranslation.fromDto(t)),
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const {error} = response.error;
            this.errorService.throwError(CHARACTER_STATE_CONFIG.toastTranslationKeys.characterTranslations, response);
            return of(loadCharacterTranslationsFailure({error}));
          }),
        ),
      ),
    ),
  );
}
