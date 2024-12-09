import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@Enums/local-storage-key.enum';
import { APP_CONFIG } from '@Configs/app.config';
import { Language } from '@Features/language/_enums/language.enum';
import { ColorTheme } from '@Features/color-theme/_enums/color-theme.enum';
import { BehaviorSubject } from 'rxjs';
import { User } from '@Models/user.model';
import { GameSession } from '@Models/game-session.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readonly languageSubject = new BehaviorSubject<Language>(APP_CONFIG.defaultLanguage);
  readonly colorThemeSubject = new BehaviorSubject<ColorTheme>(this.getUserPreferredColorTheme());
  readonly userSubject = new BehaviorSubject<User | null>(this.getUser());
  readonly playerTokenSubject = new BehaviorSubject<string | null>(this.getPlayerToken());
  readonly gameSessionSubject = new BehaviorSubject<GameSession | null>(this.getGameSession());

  constructor() {
    this.initializeLanguage();
    this.initializeColorTheme();
    this.initializeUser();
    this.initializePlayerToken();
    this.initializeGameSession();
  }

  get language(): Language {
    return this.languageSubject.getValue();
  }

  set language(language: Language) {
    this.languageSubject.next(language);
    this.setLanguage(language);
  }

  get colorTheme(): ColorTheme {
    return this.colorThemeSubject.getValue();
  }

  set colorTheme(theme: ColorTheme) {
    this.colorThemeSubject.next(theme);
    this.setColorTheme(theme);
  }

  get user(): User | null {
    return this.userSubject.getValue();
  }

  set user(user: User | null) {
    this.userSubject.next(user);
    this.setUser(user);
  }

  get playerToken(): string | null {
    return this.playerTokenSubject.getValue();
  }

  set playerToken(token: string | null) {
    this.playerTokenSubject.next(token);
    this.setPlayerToken(token);
  }

  get gameSession(): GameSession | null {
    return this.gameSessionSubject.getValue();
  }

  set gameSession(gameSession: GameSession | null) {
    this.gameSessionSubject.next(gameSession);
    this.setGameSession(gameSession);
  }

  private getLanguage(): Language | null {
    return localStorage.getItem(LocalStorageKey.LANGUAGE) as Language | null;
  }

  private setLanguage(language: Language): void {
    localStorage.setItem(LocalStorageKey.LANGUAGE, language);
  }

  private initializeLanguage(): void {
    this.language = this.getLanguage() ?? APP_CONFIG.defaultLanguage;
  }

  private getColorTheme(): ColorTheme | null {
    return localStorage.getItem(LocalStorageKey.COLOR_THEME) as ColorTheme | null;
  }

  private setColorTheme(theme: ColorTheme): void {
    localStorage.setItem(LocalStorageKey.COLOR_THEME, theme);
  }

  private initializeColorTheme(): void {
    this.colorTheme = this.getColorTheme() ?? this.getUserPreferredColorTheme();
  }

  private getUserPreferredColorTheme(): ColorTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? ColorTheme.DARK : ColorTheme.LIGHT;
  }

  private getUser(): User | null {
    const user = localStorage.getItem(LocalStorageKey.USER);
    return user ? JSON.parse(user) : null;
  }

  private setUser(user: User | null): void {
    if (user) {
      localStorage.setItem(LocalStorageKey.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LocalStorageKey.USER);
    }
  }

  private initializeUser(): void {
    this.user = this.getUser();
  }

  private getPlayerToken(): string | null {
    return localStorage.getItem(LocalStorageKey.PLAYER_TOKEN);
  }

  private setPlayerToken(token: string | null): void {
    if (token) {
      localStorage.setItem(LocalStorageKey.PLAYER_TOKEN, token);
    } else {
      localStorage.removeItem(LocalStorageKey.PLAYER_TOKEN);
    }
  }

  private initializePlayerToken(): void {
    this.playerToken = this.getPlayerToken();
  }

  private getGameSession(): GameSession | null {
    const gameSessionString = localStorage.getItem(LocalStorageKey.GAME_SESSION);

    if (!gameSessionString) {
      return null;
    }

    const parsedGameSession = JSON.parse(gameSessionString) as GameSession;

    return new GameSession(
      parsedGameSession.id,
      parsedGameSession.token,
      parsedGameSession.phase,
      parsedGameSession.created_at,
      parsedGameSession.updated_at,
      parsedGameSession.players,
    );
  }

  private setGameSession(gameSession: GameSession | null): void {
    if (gameSession) {
      localStorage.setItem(LocalStorageKey.GAME_SESSION, JSON.stringify(gameSession));
    } else {
      localStorage.removeItem(LocalStorageKey.GAME_SESSION);
    }
  }

  initializeGameSession(): void {
    this.gameSession = this.getGameSession();
  }
}
