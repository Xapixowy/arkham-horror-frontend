import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { GameSessionSectionComponent } from '@Pages/landing/landing-page/_components/game-session-section/game-session-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoPipe, GameSessionSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
