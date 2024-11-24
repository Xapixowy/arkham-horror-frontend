import {Pipe, PipeTransform} from '@angular/core';
import {formatDistanceToNow} from 'date-fns';

@Pipe({
  name: 'dateHumanReadable',
  standalone: true
})
export class DateHumanReadablePipe implements PipeTransform {
  transform(value: Date): string {
    return formatDistanceToNow(value, {addSuffix: true});
  }
}
