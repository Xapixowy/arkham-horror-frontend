import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {Language} from '@Features/language/_enums/language.enum';
import {APP_CONFIG} from '@Configs/app.config';
import {LANGUAGE_SERVICE_CONFIG} from '@Features/language/_configs/language-service.config';
import {TranslocoService} from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly translocoService = inject(TranslocoService)

  private readonly languageSubject = new BehaviorSubject<Language>(APP_CONFIG.defaultLanguage)

  constructor() {
    this.initializeLanguage()
  }

  get language(): Language {
    return this.languageSubject.getValue()
  }

  async setLanguage(value: Language): Promise<void> {
    this.languageSubject.next(value)
    await this.setSavedLanguage(value)
  }

  private async initializeLanguage(): Promise<void> {
    const savedLanguage = this.getSavedLanguage()

    await this.setLanguage(savedLanguage ?? APP_CONFIG.defaultLanguage)
    await this.loadLanguage(this.language)
  }

  private getSavedLanguage(): Language | null {
    const savedLanguage = localStorage.getItem(LANGUAGE_SERVICE_CONFIG.localStorageLanguageKey);

    return savedLanguage ? savedLanguage as Language : null;
  }

  private async setSavedLanguage(language: Language): Promise<void> {
    localStorage.setItem(LANGUAGE_SERVICE_CONFIG.localStorageLanguageKey, language)
    await this.loadLanguage(language)
  }

  private async loadLanguage(language: Language): Promise<void> {
    this.translocoService.setActiveLang(language)
    await firstValueFrom(this.translocoService.load(language));
  }
}
