import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [],
  templateUrl: './character-page.component.html',
  styleUrl: './character-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterPageComponent {

}
