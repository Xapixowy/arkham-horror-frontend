import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToText',
  standalone: true,
})
export class HtmlToTextPipe implements PipeTransform {
  transform(value: string): string {
    const div = document.createElement('div');
    div.innerHTML = value;
    return div.textContent || '';
  }
}
