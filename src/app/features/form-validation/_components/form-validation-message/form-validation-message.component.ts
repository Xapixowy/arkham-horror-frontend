import {Component, inject, input} from '@angular/core';
import {FormValidationService} from '@Features/form-validation/_services/form-validation.service';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form-validation-message',
  standalone: true,
  imports: [],
  templateUrl: './form-validation-message.component.html',
  styleUrl: './form-validation-message.component.scss'
})
export class FormValidationMessageComponent {
  protected readonly formValidationService = inject(FormValidationService);

  private readonly errorFormControl = input.required<AbstractControl>();

  hasFormControlErrors(): boolean {
    return this.formValidationService.hasFormControlErrors(this.errorFormControl());
  }

  generateErrorMessage(): string {
    return this.formValidationService.getErrorMessage(this.errorFormControl());
  }
}
