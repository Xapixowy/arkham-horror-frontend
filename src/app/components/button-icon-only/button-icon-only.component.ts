import {Component, input, output} from '@angular/core';
import {Button} from 'primeng/button';
import {Severity} from '@Types/severity.type';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-button-icon-only',
  standalone: true,
  imports: [
    Button,
    NgIcon
  ],
  templateUrl: './button-icon-only.component.html',
  styleUrl: './button-icon-only.component.scss'
})
export class ButtonIconOnlyComponent {
  readonly icon = input.required<string>();
  readonly severity = input<Severity>('primary');
  readonly onClick = output<void>();
}
