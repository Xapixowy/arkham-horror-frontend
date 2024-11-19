import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Language } from '@Features/language/_enums/language.enum';
import { TranslocoService } from '@jsverse/transloco';
import { LocalStorageService } from '@Services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translocoService = inject(TranslocoService);
  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    this.subscribeToLanguageChanges();
  }

  get language(): Language {
    return this.localStorageService.language;
  }

  set language(value: Language) {
    this.localStorageService.language = value;
  }

  private subscribeToLanguageChanges(): void {
    this.localStorageService.languageSubject.subscribe((language) => {
      this.loadLanguage(language);
    });
  }

  private async loadLanguage(language: Language): Promise<void> {
    this.translocoService.setActiveLang(language);
    await firstValueFrom(this.translocoService.load(language));
  }
}
