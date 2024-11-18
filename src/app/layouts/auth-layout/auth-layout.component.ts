import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  ColorThemeSwitcherComponent
} from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import {LanguageSwitcherComponent} from '@Features/language/_components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ColorThemeSwitcherComponent,
    LanguageSwitcherComponent
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
