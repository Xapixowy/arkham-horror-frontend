import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoPipe, Button],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
