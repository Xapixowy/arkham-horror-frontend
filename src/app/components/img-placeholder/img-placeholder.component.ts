import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerPhotoOff } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-img-placeholder',
  standalone: true,
  imports: [NgIcon],
  providers: [
    provideIcons({
      tablerPhotoOff,
    }),
  ],
  templateUrl: './img-placeholder.component.html',
  styleUrl: './img-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgPlaceholderComponent {
  readonly size = input.required<string>();
  readonly shape = input<'circle' | 'square'>('circle');
}
