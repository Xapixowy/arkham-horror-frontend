import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Severity } from '@Types/severity.type';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-button-icon-only',
  standalone: true,
  imports: [Button, NgIcon],
  templateUrl: './button-icon-only.component.html',
  styleUrl: './button-icon-only.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconOnlyComponent {
  readonly icon = input.required<string>();
  readonly severity = input<Severity>('primary');
  readonly size = input<'small' | 'medium' | 'large'>('medium');

  readonly onClick = output<void>();

  protected readonly sizeClass = computed<string>(() => {
    switch (this.size()) {
      case 'small':
        return 'p-button--small';
      case 'large':
        return 'p-button--large';
      default:
        return '';
    }
  });
}
