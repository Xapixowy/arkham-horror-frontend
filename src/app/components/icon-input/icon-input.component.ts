import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-input',
  standalone: true,
  imports: [],
  templateUrl: './icon-input.component.html',
  styleUrl: './icon-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconInputComponent {}
