import {Component, inject, signal} from '@angular/core';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {Language} from '@Features/language/_enums/language.enum';
import {FormsModule} from '@angular/forms';
import {APP_CONFIG} from '@Configs/app.config';
import {LanguageService} from '@Features/language/_services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService)

  protected readonly language = signal<Language>(Language.POLISH)
  protected readonly APP_CONFIG = APP_CONFIG;
  protected readonly Language = Language;

  constructor() {
    this.language.set(this.languageService.language)
  }

  async onChange(value: DropdownChangeEvent): Promise<void> {
    await this.languageService.setLanguage(value.value as Language)
    window.location.reload()
  }
}
