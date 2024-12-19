import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { GameSessionSectionComponent } from '@Pages/landing/landing-page/_components/game-session-section/game-session-section.component';
import { LandingPageService } from '@Pages/landing/landing-page/landing-page.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoPipe, GameSessionSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  private readonly landingPageService = inject(LandingPageService);

  ngOnInit(): void {
    this.landingPageService.clearGameStorage();
  }
}
